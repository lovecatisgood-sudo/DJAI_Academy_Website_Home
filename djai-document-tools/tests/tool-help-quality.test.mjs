import assert from 'node:assert/strict';
import test from 'node:test';
import { readFileSync } from 'node:fs';
import { tools } from '../app/tool-data.ts';
import { englishToolHelp } from '../app/tool-help.ts';
import { processTool } from '../app/processors.ts';

const options={paperSize:'a4',margin:42,pageNumbers:false,pageRange:'',preserveBreaks:true,ocrLanguage:'eng',chunkSize:10,chunkOverlap:2,boundary:'markdown',splitRows:2,worksheet:0};
const tool=(slug)=>tools.find(item=>item.slug===slug);
const file=(name,text)=>new File([text],name,{type:name.endsWith('.json')?'application/json':'text/plain'});

test('every generic English tool receives distinct task-specific help',()=>{
 const expected=tools.filter(item=>item.slug!=='token-counter');
 assert.deepEqual(Object.keys(englishToolHelp).sort(),expected.map(item=>item.slug).sort());
 const questions=[];
 for(const item of expected){const help=englishToolHelp[item.slug];assert.ok(help.steps.length>=3);assert.ok(help.faq.length>=2);questions.push(help.faq[0][0]);
  if(item.category==='spreadsheet') assert.doesNotMatch(JSON.stringify(help),/Word layout|Document formats store layout|paste text/i);
 }
 assert.equal(new Set(questions).size,expected.length);
 const page=readFileSync(new URL('../app/tool-page.tsx',import.meta.url),'utf8');
 assert.doesNotMatch(page,/totalTime:\s*"PT3M"/);
});

test('CSV to JSON preserves a leading-zero identifier and a quoted comma',async()=>{
 const result=await processTool(tool('csv-to-json'),[file('sample.csv','code,name\n001,"Tea, green"\n002,Coffee\n')],'',options);
 assert.deepEqual(JSON.parse(result.text),[{code:'001',name:'Tea, green'},{code:'002',name:'Coffee'}]);
 assert.equal(result.fileName,'sample.json');
});

test('CSV cleaning trims values, removes empty rows and exact duplicates',async()=>{
 const result=await processTool(tool('csv-cleaner'),[file('sample.csv','name,code\n Tea ,001\nTea,001\n,\nTea,002\n')],'',options);
 const json=await processTool(tool('csv-to-json'),[file('clean.csv',result.text)],'',options);
 assert.deepEqual(JSON.parse(json.text),[{name:'Tea',code:'001'},{name:'Tea',code:'002'}]);
});

test('CSV merge uses header names across differing column orders',async()=>{
 const result=await processTool(tool('merge-csv'),[file('a.csv','code,name\n001,Tea'),file('b.csv','name,code,note\nCoffee,002,new')],'',options);
 const json=await processTool(tool('csv-to-json'),[file('merged.csv',result.text)],'',options);
 assert.deepEqual(JSON.parse(json.text),[{code:'001',name:'Tea',note:''},{code:'002',name:'Coffee',note:'new'}]);
});

test('JSON conversion rejects a single object rather than claiming array conversion',async()=>{
 await assert.rejects(processTool(tool('json-to-csv'),[file('one.json','{"code":"001"}')],'',options),/array of objects/);
 const csv=await processTool(tool('json-to-csv'),[file('many.json','[{"code":"001","name":"Tea"}]')],'',options);
 assert.match(csv.text,/code,name/);assert.match(csv.text,/001,Tea/);
});

test('RAG help matches the paste-only workspace and produces a JSONL result',async()=>{
 assert.doesNotMatch(englishToolHelp['rag-chunk-calculator'].steps[0], /choose|file|import/i);
 const result=await processTool(tool('rag-chunk-calculator'),[],'Context instructions about tea and coffee.',{...options,chunkSize:100});
 assert.match(await result.blob.text(),/Context instructions/);
 assert.equal(result.fileName,'DJTools-rag-chunks.jsonl');
 await assert.rejects(processTool(tool('rag-chunk-calculator'),[],'',options),/text/);
});

test('CSV splitting produces header-bearing parts rather than raw newline slices',async()=>{
 const {default:JSZip}=await import('jszip');
 const result=await processTool(tool('split-csv'),[file('sample.csv','code,name\n001,Tea\n002,Coffee\n003,Water')],'',options);
 const zip=await JSZip.loadAsync(await result.blob.arrayBuffer());
 const names=Object.keys(zip.files).sort();assert.equal(names.length,2);
 const part1=await zip.file(names[0]).async('string');const part2=await zip.file(names[1]).async('string');
 assert.equal(part1.split(/\r?\n/).length,3);assert.match(part2,/^code,name/);assert.match(part2,/003,Water/);
});

test('CSV to XLSX preserves identifier strings in the Data worksheet',async()=>{
 const {default:ExcelJS}=await import('exceljs');
 const result=await processTool(tool('csv-to-xlsx'),[file('sample.csv','code,name\n001,Tea')],'',options);
 const book=new ExcelJS.Workbook();await book.xlsx.load(await result.blob.arrayBuffer());
 assert.equal(book.worksheets[0].name,'Data');assert.equal(book.worksheets[0].getCell('A2').value,'001');
 const back=await processTool(tool('xlsx-to-csv'),[new File([await result.blob.arrayBuffer()],'sample.xlsx')],'',options);
 assert.match(back.text,/code,name/);assert.match(back.text,/001,Tea/);
});

test('help follows visible worksheet numbering and does not invent a PDF preview',()=>{
 const workspace=readFileSync(new URL('../app/ToolWorkspace.tsx',import.meta.url),'utf8');
 assert.match(workspace,/Worksheet number/);assert.match(workspace,/value=\{options\.worksheet \+ 1\}/);
 assert.match(englishToolHelp['xlsx-to-csv'].steps[1],/1 is the first/);
 assert.doesNotMatch(JSON.stringify(englishToolHelp['docx-to-pdf']),/inspect the preview/i);
 assert.doesNotMatch(tool('docx-to-pdf').description.en,/preview/i);
 assert.doesNotMatch(tool('pdf-to-ai-markdown').description.en,/repeated headers|footers/);
 assert.match(englishToolHelp['context-optimizer'].guidance.copy,/page separators/);
});
