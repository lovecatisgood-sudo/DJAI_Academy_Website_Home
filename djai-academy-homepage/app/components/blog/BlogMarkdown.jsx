import { normalizeBlogHref } from "../../lib/blogContent.js";

function renderInline(text) {
  const parts = String(text).split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g);

  return parts.map((part, index) => {
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const safeHref = normalizeBlogHref(href);
      if (!safeHref) {
        return label;
      }

      const isExternal = safeHref.startsWith("http://") || safeHref.startsWith("https://");
      return (
        <a
          href={safeHref}
          key={`${safeHref}-${index}`}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {label}
        </a>
      );
    }

    const strongMatch = part.match(/^\*\*([^*]+)\*\*$/);
    if (strongMatch) {
      return <strong key={`strong-${index}`}>{renderInline(strongMatch[1])}</strong>;
    }

    const codeMatch = part.match(/^`([^`]+)`$/);
    if (codeMatch) {
      return <code key={`code-${index}`}>{codeMatch[1]}</code>;
    }

    return part;
  });
}

function isTableSeparator(line) {
  return /^\|?[\s:-]+\|[\s|:-]+\|?$/.test(line);
}

function isTableRow(line) {
  const trimmed = line.trim();
  return trimmed.startsWith("|") && trimmed.endsWith("|") && trimmed.slice(1, -1).includes("|");
}

function parseTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export default function BlogMarkdown({ content }) {
  const blocks = [];
  let listItems = [];
  let orderedListItems = [];
  let tableRows = [];
  let flowItems = [];
  let quoteLines = [];
  let codeLines = [];
  let inFlow = false;
  let inCode = false;

  function flushList() {
    if (!listItems.length) {
      return;
    }

    const items = listItems;
    listItems = [];
    blocks.push(
      <ul key={`list-${blocks.length}`}>
        {items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  function flushOrderedList() {
    if (!orderedListItems.length) {
      return;
    }

    const items = orderedListItems;
    orderedListItems = [];
    blocks.push(
      <ol key={`ordered-list-${blocks.length}`}>
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{renderInline(item)}</li>
        ))}
      </ol>
    );
  }

  function flushQuote() {
    if (!quoteLines.length) {
      return;
    }

    const lines = quoteLines;
    quoteLines = [];
    blocks.push(
      <blockquote key={`quote-${blocks.length}`}>
        {lines.map((line, index) => (
          <p key={`${line}-${index}`}>{renderInline(line)}</p>
        ))}
      </blockquote>
    );
  }

  function flushCode() {
    if (!codeLines.length) {
      return;
    }

    const lines = codeLines;
    codeLines = [];
    blocks.push(
      <pre className="article-code" key={`code-${blocks.length}`}>
        <code>{lines.join("\n")}</code>
      </pre>
    );
  }

  function flushSimpleBlocks() {
    flushList();
    flushOrderedList();
    flushQuote();
    flushTable();
  }

  function flushTable() {
    if (tableRows.length < 2) {
      tableRows = [];
      return;
    }

    const [headings, ...rows] = tableRows;
    tableRows = [];
    blocks.push(
      <div className="article-table-wrap" key={`table-${blocks.length}`} tabIndex={0}>
        <table className="article-table">
          <thead>
            <tr>
              {headings.map((heading) => (
                <th key={heading}>{renderInline(heading)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`row-${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`${rowIndex}-${cellIndex}`}>{renderInline(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  function flushFlow() {
    if (!flowItems.length) {
      return;
    }

    const items = flowItems;
    flowItems = [];
    blocks.push(
      <div className="article-flow" key={`flow-${blocks.length}`}>
        {items.map((item, index) => (
          <div className="article-flow-step" key={`${item}-${index}`}>
            <span>{index + 1}</span>
            <strong>{renderInline(item)}</strong>
          </div>
        ))}
      </div>
    );
  }

  String(content || "")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("```")) {
        if (inCode) {
          flushCode();
          inCode = false;
        } else {
          flushSimpleBlocks();
          inCode = true;
        }
        return;
      }

      if (inCode) {
        codeLines.push(line.replace(/\s+$/, ""));
        return;
      }

      if (!trimmed) {
        flushSimpleBlocks();
        if (inFlow) {
          flushFlow();
          inFlow = false;
        }
        return;
      }

      if (trimmed === ":::flow") {
        flushSimpleBlocks();
        inFlow = true;
        return;
      }

      if (trimmed === ":::") {
        flushFlow();
        inFlow = false;
        return;
      }

      if (inFlow) {
        if (trimmed.startsWith("- ")) {
          flowItems.push(trimmed.slice(2));
        }
        return;
      }

      if (isTableRow(trimmed) && !isTableSeparator(trimmed)) {
        flushList();
        flushOrderedList();
        flushQuote();
        tableRows.push(parseTableRow(trimmed));
        return;
      }

      if (tableRows.length && isTableSeparator(trimmed)) {
        return;
      }

      if (trimmed.startsWith("### ")) {
        flushSimpleBlocks();
        blocks.push(<h3 key={`h3-${blocks.length}`}>{renderInline(trimmed.slice(4))}</h3>);
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushSimpleBlocks();
        blocks.push(<h2 key={`h2-${blocks.length}`}>{renderInline(trimmed.slice(3))}</h2>);
        return;
      }

      const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        flushSimpleBlocks();
        const [, alt, src] = imageMatch;
        const safeSrc = normalizeBlogHref(src, { allowMailto: false });
        if (!safeSrc) {
          blocks.push(<p key={`invalid-image-${blocks.length}`}>{alt}</p>);
          return;
        }
        blocks.push(
          <figure className="article-image" key={`image-${blocks.length}`}>
            <img alt={alt} src={safeSrc} loading="lazy" decoding="async" />
          </figure>
        );
        return;
      }

      if (trimmed.startsWith("- ")) {
        flushOrderedList();
        flushQuote();
        flushTable();
        listItems.push(trimmed.slice(2));
        return;
      }

      const orderedMatch = trimmed.match(/^\d+\.\s+(.+)$/);
      if (orderedMatch) {
        flushList();
        flushQuote();
        flushTable();
        orderedListItems.push(orderedMatch[1]);
        return;
      }

      if (trimmed.startsWith("> ")) {
        flushList();
        flushOrderedList();
        flushTable();
        quoteLines.push(trimmed.slice(2));
        return;
      }

      flushSimpleBlocks();
      blocks.push(<p key={`p-${blocks.length}`}>{renderInline(trimmed)}</p>);
    });

  flushSimpleBlocks();
  flushCode();
  flushFlow();
  return blocks;
}
