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

export default function BlogMarkdown({ content }) {
  const blocks = [];
  let listItems = [];

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

  String(content || "")
    .split("\n")
    .forEach((line) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        return;
      }

      if (trimmed.startsWith("### ")) {
        flushList();
        blocks.push(<h3 key={`h3-${blocks.length}`}>{renderInline(trimmed.slice(4))}</h3>);
        return;
      }

      if (trimmed.startsWith("## ")) {
        flushList();
        blocks.push(<h2 key={`h2-${blocks.length}`}>{renderInline(trimmed.slice(3))}</h2>);
        return;
      }

      const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        flushList();
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
      blocks.push(<p key={`p-${blocks.length}`}>{renderInline(trimmed)}</p>);
    });

  flushList();
  return blocks;
}
