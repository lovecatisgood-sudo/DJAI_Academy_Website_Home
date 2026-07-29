function renderInline(text) {
  const parts = String(text).split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) {
      return part;
    }

    const [, label, href] = match;
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        key={`${href}-${index}`}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {label}
      </a>
    );
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
  let tableRows = [];
  let flowItems = [];
  let inFlow = false;

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

  function flushTable() {
    if (tableRows.length < 2) {
      tableRows = [];
      return;
    }

    const [headings, ...rows] = tableRows;
    tableRows = [];
    blocks.push(
      <div className="article-table-wrap" key={`table-${blocks.length}`}>
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

      if (!trimmed) {
        flushList();
        flushTable();
        if (inFlow) {
          flushFlow();
          inFlow = false;
        }
        return;
      }

      if (trimmed === ":::flow") {
        flushList();
        flushTable();
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
        tableRows.push(parseTableRow(trimmed));
        return;
      }

      if (tableRows.length && isTableSeparator(trimmed)) {
        return;
      }

      if (trimmed.startsWith("### ")) {
        flushList();
        flushTable();
        blocks.push(<h3 key={`h3-${blocks.length}`}>{renderInline(trimmed.slice(4))}</h3>);
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        flushTable();
        blocks.push(<h2 key={`h2-${blocks.length}`}>{renderInline(trimmed.slice(3))}</h2>);
        return;
      }

      const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        flushList();
        flushTable();
        const [, alt, src] = imageMatch;
        blocks.push(
          <figure className="article-image" key={`image-${blocks.length}`}>
            <img alt={alt} src={src} loading="lazy" decoding="async" />
          </figure>
        );
        return;
      }

      if (trimmed.startsWith("- ")) {
        listItems.push(trimmed.slice(2));
        return;
      }

      flushList();
      flushTable();
      blocks.push(<p key={`p-${blocks.length}`}>{renderInline(trimmed)}</p>);
    });

  flushList();
  flushTable();
  flushFlow();
  return blocks;
}
