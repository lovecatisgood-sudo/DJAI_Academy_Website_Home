(() => {
  'use strict';

  const $ = (selector, parent = document) => parent.querySelector(selector);
  const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const els = {
    menuToggle: $('.menu-toggle'),
    mainNav: $('.main-nav'),
    dropZone: $('#drop-zone'),
    fileInput: $('#file-input'),
    uploadView: $('#upload-view'),
    editorView: $('#editor-view'),
    removeFile: $('#remove-file'),
    tinyPreview: $('#tiny-preview'),
    mainPreview: $('#main-preview'),
    fileName: $('#file-name'),
    fileMeta: $('#file-meta'),
    modeTabs: $$('.mode-tab'),
    panels: $$('.setting-panel'),
    targetSize: $('#target-size'),
    quickSizes: $$('[data-size]'),
    keepDimensions: $('#keep-dimensions'),
    percentage: $('#percentage'),
    percentageValue: $('#percentage-value'),
    percentageDimensions: $('#percentage-dimensions'),
    quickPercents: $$('[data-percent]'),
    widthInput: $('#width-input'),
    heightInput: $('#height-input'),
    ratioLock: $('#ratio-lock'),
    formatSelect: $('#format-select'),
    processButton: $('#process-button'),
    errorMessage: $('#error-message'),
    previewTabs: $$('.preview-tab'),
    previewStage: $('#preview-stage'),
    checkerToggle: $('#checker-toggle'),
    emptyResult: $('#empty-result'),
    previewSize: $('#preview-size'),
    previewDimensions: $('#preview-dimensions'),
    previewFormat: $('#preview-format'),
    resultBar: $('#result-bar'),
    resultSummaryText: $('#result-summary-text'),
    beforeSize: $('#before-size'),
    afterSize: $('#after-size'),
    savedBadge: $('#saved-badge'),
    downloadButton: $('#download-button'),
    year: $('#current-year')
  };

  const isThai = document.documentElement.lang.toLowerCase().startsWith('th');
  const copy = isThai ? {
    imageFallback: 'รูปภาพ',
    chooseSupported: 'กรุณาเลือกไฟล์ JPG, PNG หรือ WebP',
    tooLarge: 'รูปนี้มีขนาดเกิน 50 MB กรุณาเลือกไฟล์ที่เล็กกว่านี้',
    readError: 'เราไม่สามารถอ่านรูปนี้ได้ ไฟล์อาจเสียหายหรือใช้ encoding ที่ไม่รองรับ',
    exportError: 'Browser ไม่สามารถ export รูปภาพได้',
    dimensionTooLarge: 'ขนาดภาพที่ขอใหญ่เกินไปสำหรับการประมวลผลใน browser อย่างปลอดภัย',
    invalidDimensions: 'กรุณาใส่ค่าความกว้างและความสูงที่ถูกต้อง',
    targetRange: 'กรุณาเลือกขนาดเป้าหมายระหว่าง 5 KB ถึง 50,000 KB',
    genericError: 'เกิดข้อผิดพลาดระหว่างย่อรูปภาพ',
    smaller: (value) => `เล็กลง ${value}%`,
    larger: (value) => `ใหญ่ขึ้น ${value}%`
  } : {
    imageFallback: 'Image',
    chooseSupported: 'Please choose a JPG, PNG, or WebP image.',
    tooLarge: 'This image is larger than 50 MB. Please choose a smaller file.',
    readError: 'We could not read this image. It may be damaged or use an unsupported encoding.',
    exportError: 'The browser could not export the image.',
    dimensionTooLarge: 'The requested dimensions are too large for safe browser processing.',
    invalidDimensions: 'Enter valid width and height values.',
    targetRange: 'Choose a target between 5 KB and 50,000 KB.',
    genericError: 'Something went wrong while resizing the image.',
    smaller: (value) => `${value}% smaller`,
    larger: (value) => `${value}% larger`
  };

  const state = {
    file: null,
    bitmap: null,
    objectUrl: null,
    resultBlob: null,
    resultUrl: null,
    resultName: null,
    mode: 'target',
    ratioLocked: true,
    activePreview: 'original',
    originalWidth: 0,
    originalHeight: 0,
    originalType: '',
    originalHasTransparency: false,
    resultWidth: 0,
    resultHeight: 0,
    resultType: ''
  };

  const formatBytes = (bytes) => {
    if (!Number.isFinite(bytes)) return '—';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(bytes < 10240 ? 1 : 0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const typeLabel = (type) => ({
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/webp': 'WebP'
  }[type] || (type.split('/')[1] || copy.imageFallback).toUpperCase());

  const extensionForType = (type) => ({
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp'
  }[type] || 'jpg');

  const safeBaseName = (name) => {
    const base = name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9_-]+/gi, '-').replace(/^-+|-+$/g, '');
    return base || 'resized-image';
  };

  const setError = (message = '') => {
    els.errorMessage.textContent = message;
    els.errorMessage.hidden = !message;
  };

  const revokeUrl = (key) => {
    if (state[key]) URL.revokeObjectURL(state[key]);
    state[key] = null;
  };

  const getImageType = () => {
    if (els.formatSelect.value !== 'original') return els.formatSelect.value;
    return ['image/jpeg', 'image/png', 'image/webp'].includes(state.originalType) ? state.originalType : 'image/jpeg';
  };

  const hasTransparency = async (bitmap) => {
    if (state.originalType !== 'image/png' && state.originalType !== 'image/webp') return false;
    const sampleWidth = Math.min(bitmap.width, 320);
    const sampleHeight = Math.max(1, Math.round(bitmap.height * sampleWidth / bitmap.width));
    const canvas = document.createElement('canvas');
    canvas.width = sampleWidth;
    canvas.height = sampleHeight;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(bitmap, 0, 0, sampleWidth, sampleHeight);
    const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
    for (let i = 3; i < data.length; i += 4) if (data[i] < 250) return true;
    return false;
  };

  const updatePercentageUI = () => {
    if (!state.bitmap) return;
    const percent = Number(els.percentage.value);
    const width = Math.max(1, Math.round(state.originalWidth * percent / 100));
    const height = Math.max(1, Math.round(state.originalHeight * percent / 100));
    els.percentageValue.textContent = `${percent}%`;
    els.percentageDimensions.textContent = `${width.toLocaleString()} × ${height.toLocaleString()} px`;
    els.quickPercents.forEach(button => button.classList.toggle('selected', Number(button.dataset.percent) === percent));
  };

  const showPreview = (kind) => {
    state.activePreview = kind;
    els.previewTabs.forEach(tab => tab.classList.toggle('active', tab.dataset.preview === kind));
    if (kind === 'result' && state.resultBlob) {
      els.mainPreview.src = state.resultUrl;
      els.mainPreview.hidden = false;
      els.emptyResult.hidden = true;
      els.previewSize.textContent = formatBytes(state.resultBlob.size);
      els.previewDimensions.textContent = `${state.resultWidth.toLocaleString()} × ${state.resultHeight.toLocaleString()} px`;
      els.previewFormat.textContent = typeLabel(state.resultType);
    } else {
      els.mainPreview.src = state.objectUrl || '';
      els.mainPreview.hidden = !state.objectUrl;
      els.emptyResult.hidden = true;
      els.previewSize.textContent = state.file ? formatBytes(state.file.size) : '—';
      els.previewDimensions.textContent = state.bitmap ? `${state.originalWidth.toLocaleString()} × ${state.originalHeight.toLocaleString()} px` : '—';
      els.previewFormat.textContent = state.originalType ? typeLabel(state.originalType) : '—';
    }
  };

  const clearResult = () => {
    revokeUrl('resultUrl');
    state.resultBlob = null;
    state.resultName = null;
    state.resultWidth = 0;
    state.resultHeight = 0;
    state.resultType = '';
    els.resultBar.hidden = true;
    const resultTab = $('.preview-tab[data-preview="result"]');
    resultTab.disabled = true;
    if (state.activePreview === 'result') showPreview('original');
  };

  const reset = () => {
    if (state.bitmap?.close) state.bitmap.close();
    state.bitmap = null;
    state.file = null;
    revokeUrl('objectUrl');
    clearResult();
    state.originalWidth = 0;
    state.originalHeight = 0;
    state.originalType = '';
    state.originalHasTransparency = false;
    els.fileInput.value = '';
    els.editorView.hidden = true;
    els.uploadView.hidden = false;
    setError();
  };

  const loadFile = async (file) => {
    setError();
    if (!file) return;
    const supported = ['image/jpeg', 'image/png', 'image/webp'];
    if (!supported.includes(file.type)) {
      setError(copy.chooseSupported);
      return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setError(copy.tooLarge);
      return;
    }

    try {
      if (state.bitmap?.close) state.bitmap.close();
      revokeUrl('objectUrl');
      clearResult();

      state.file = file;
      state.originalType = file.type;
      state.bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
      state.originalWidth = state.bitmap.width;
      state.originalHeight = state.bitmap.height;
      state.originalHasTransparency = await hasTransparency(state.bitmap);
      state.objectUrl = URL.createObjectURL(file);

      els.fileName.textContent = file.name;
      els.fileMeta.textContent = `${formatBytes(file.size)} · ${state.originalWidth.toLocaleString()} × ${state.originalHeight.toLocaleString()} px`;
      els.tinyPreview.src = state.objectUrl;
      els.widthInput.value = state.originalWidth;
      els.heightInput.value = state.originalHeight;
      updatePercentageUI();
      els.uploadView.hidden = true;
      els.editorView.hidden = false;
      showPreview('original');
      setTimeout(() => els.editorView.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 80);
    } catch (error) {
      console.error(error);
      reset();
      setError(copy.readError);
    }
  };

  const switchMode = (mode) => {
    state.mode = mode;
    els.modeTabs.forEach(tab => {
      const active = tab.dataset.mode === mode;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    els.panels.forEach(panel => {
      const active = panel.dataset.panel === mode;
      panel.classList.toggle('active', active);
      panel.hidden = !active;
    });
    clearResult();
  };

  const canvasToBlob = (canvas, type, quality) => new Promise((resolve, reject) => {
    canvas.toBlob(blob => blob ? resolve(blob) : reject(new Error(copy.exportError)), type, quality);
  });

  const renderBlob = async (width, height, type, quality = .92) => {
    const maxDimension = 20000;
    if (width > maxDimension || height > maxDimension || width * height > 100_000_000) {
      throw new Error(copy.dimensionTooLarge);
    }
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d', { alpha: type !== 'image/jpeg' });
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    if (type === 'image/jpeg') {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);
    }
    ctx.drawImage(state.bitmap, 0, 0, width, height);
    return canvasToBlob(canvas, type, quality);
  };

  const bestQualityAtDimensions = async (width, height, type, targetBytes) => {
    const highBlob = await renderBlob(width, height, type, .96);
    if (highBlob.size <= targetBytes) return { blob: highBlob, quality: .96 };

    const lowBlob = await renderBlob(width, height, type, .05);
    if (lowBlob.size > targetBytes) return { blob: lowBlob, quality: .05, tooLarge: true };

    let low = .05;
    let high = .96;
    let best = lowBlob;
    let bestQuality = low;
    for (let i = 0; i < 9; i++) {
      const mid = (low + high) / 2;
      const blob = await renderBlob(width, height, type, mid);
      if (blob.size <= targetBytes) {
        best = blob;
        bestQuality = mid;
        low = mid;
      } else {
        high = mid;
      }
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    return { blob: best, quality: bestQuality };
  };

  const compressToTarget = async (targetBytes, type, keepDimensions) => {
    let width = state.originalWidth;
    let height = state.originalHeight;
    let blob;

    if (type === 'image/png') {
      for (let attempt = 0; attempt < 12; attempt++) {
        blob = await renderBlob(width, height, type);
        if (blob.size <= targetBytes || keepDimensions) return { blob, width, height };
        const ratio = Math.sqrt(targetBytes / blob.size) * .94;
        const scale = Math.min(.9, Math.max(.45, ratio));
        width = Math.max(1, Math.round(width * scale));
        height = Math.max(1, Math.round(height * scale));
      }
      return { blob, width, height };
    }

    for (let attempt = 0; attempt < 12; attempt++) {
      const qualityResult = await bestQualityAtDimensions(width, height, type, targetBytes);
      blob = qualityResult.blob;
      if (!qualityResult.tooLarge || keepDimensions) return { blob, width, height };
      const ratio = Math.sqrt(targetBytes / blob.size) * .9;
      const scale = Math.min(.86, Math.max(.5, ratio));
      width = Math.max(1, Math.round(width * scale));
      height = Math.max(1, Math.round(height * scale));
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    return { blob, width, height };
  };

  const getResizeDimensions = () => {
    if (state.mode === 'percentage') {
      const factor = Number(els.percentage.value) / 100;
      return {
        width: Math.max(1, Math.round(state.originalWidth * factor)),
        height: Math.max(1, Math.round(state.originalHeight * factor))
      };
    }
    if (state.mode === 'dimensions') {
      const width = Math.round(Number(els.widthInput.value));
      const height = Math.round(Number(els.heightInput.value));
      if (!width || !height || width < 1 || height < 1) throw new Error(copy.invalidDimensions);
      return { width, height };
    }
    return { width: state.originalWidth, height: state.originalHeight };
  };

  const processImage = async () => {
    if (!state.bitmap || !state.file) return;
    setError();
    clearResult();
    els.processButton.classList.add('processing');
    els.processButton.setAttribute('aria-busy', 'true');

    try {
      const type = getImageType();
      let output;
      if (state.mode === 'target') {
        const targetKB = Number(els.targetSize.value);
        if (!Number.isFinite(targetKB) || targetKB < 5 || targetKB > 50000) throw new Error(copy.targetRange);
        output = await compressToTarget(targetKB * 1024, type, els.keepDimensions.checked);
      } else {
        const dimensions = getResizeDimensions();
        output = {
          blob: await renderBlob(dimensions.width, dimensions.height, type, .92),
          width: dimensions.width,
          height: dimensions.height
        };
      }

      state.resultBlob = output.blob;
      state.resultWidth = output.width;
      state.resultHeight = output.height;
      state.resultType = type;
      state.resultUrl = URL.createObjectURL(output.blob);
      state.resultName = `${safeBaseName(state.file.name)}-resized.${extensionForType(type)}`;

      const reduction = Math.round((1 - output.blob.size / state.file.size) * 100);
      els.beforeSize.textContent = formatBytes(state.file.size);
      els.afterSize.textContent = formatBytes(output.blob.size);
      els.savedBadge.textContent = reduction >= 0 ? copy.smaller(reduction) : copy.larger(Math.abs(reduction));
      els.savedBadge.classList.toggle('larger', reduction < 0);
      els.resultSummaryText.textContent = `${output.width.toLocaleString()} × ${output.height.toLocaleString()} px · ${typeLabel(type)}`;
      els.resultBar.hidden = false;
      $('.preview-tab[data-preview="result"]').disabled = false;
      showPreview('result');
      els.resultBar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
      console.error(error);
      setError(error.message || copy.genericError);
    } finally {
      els.processButton.classList.remove('processing');
      els.processButton.removeAttribute('aria-busy');
    }
  };

  els.year.textContent = new Date().getFullYear();
  els.menuToggle.addEventListener('click', () => {
    const open = els.mainNav.classList.toggle('open');
    els.menuToggle.setAttribute('aria-expanded', String(open));
  });
  $$('.main-nav a').forEach(link => link.addEventListener('click', () => {
    els.mainNav.classList.remove('open');
    els.menuToggle.setAttribute('aria-expanded', 'false');
  }));

  els.dropZone.addEventListener('click', () => els.fileInput.click());
  els.fileInput.addEventListener('change', event => loadFile(event.target.files[0]));
  ['dragenter', 'dragover'].forEach(type => els.dropZone.addEventListener(type, event => {
    event.preventDefault();
    els.dropZone.classList.add('dragover');
  }));
  ['dragleave', 'drop'].forEach(type => els.dropZone.addEventListener(type, event => {
    event.preventDefault();
    els.dropZone.classList.remove('dragover');
  }));
  els.dropZone.addEventListener('drop', event => loadFile(event.dataTransfer.files[0]));
  els.removeFile.addEventListener('click', reset);

  els.modeTabs.forEach(tab => tab.addEventListener('click', () => switchMode(tab.dataset.mode)));
  els.quickSizes.forEach(button => button.addEventListener('click', () => {
    els.targetSize.value = button.dataset.size;
    els.quickSizes.forEach(item => item.classList.toggle('selected', item === button));
    clearResult();
  }));
  els.targetSize.addEventListener('input', () => {
    els.quickSizes.forEach(button => button.classList.toggle('selected', Number(button.dataset.size) === Number(els.targetSize.value)));
    clearResult();
  });
  els.keepDimensions.addEventListener('change', clearResult);

  els.percentage.addEventListener('input', () => { updatePercentageUI(); clearResult(); });
  els.quickPercents.forEach(button => button.addEventListener('click', () => {
    els.percentage.value = button.dataset.percent;
    updatePercentageUI();
    clearResult();
  }));

  els.ratioLock.addEventListener('click', () => {
    state.ratioLocked = !state.ratioLocked;
    els.ratioLock.classList.toggle('active', state.ratioLocked);
    els.ratioLock.setAttribute('aria-pressed', String(state.ratioLocked));
  });
  els.widthInput.addEventListener('input', () => {
    if (state.ratioLocked && state.originalWidth) {
      els.heightInput.value = Math.max(1, Math.round(Number(els.widthInput.value || 1) * state.originalHeight / state.originalWidth));
    }
    clearResult();
  });
  els.heightInput.addEventListener('input', () => {
    if (state.ratioLocked && state.originalHeight) {
      els.widthInput.value = Math.max(1, Math.round(Number(els.heightInput.value || 1) * state.originalWidth / state.originalHeight));
    }
    clearResult();
  });
  els.formatSelect.addEventListener('change', clearResult);
  els.processButton.addEventListener('click', processImage);

  els.previewTabs.forEach(tab => tab.addEventListener('click', () => {
    if (!tab.disabled) showPreview(tab.dataset.preview);
  }));
  els.checkerToggle.addEventListener('click', () => {
    const active = els.previewStage.classList.toggle('checker');
    els.checkerToggle.setAttribute('aria-pressed', String(active));
  });
  els.downloadButton.addEventListener('click', () => {
    if (!state.resultBlob || !state.resultUrl) return;
    const link = document.createElement('a');
    link.href = state.resultUrl;
    link.download = state.resultName;
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  window.addEventListener('beforeunload', () => {
    revokeUrl('objectUrl');
    revokeUrl('resultUrl');
    if (state.bitmap?.close) state.bitmap.close();
  });
})();
