export function parseYoastHtmlText(text: string) {
  // This regex matches anchor tags and extracts the inner text
  const regex = /<a href='(.*?)' target='_blank'>(.*?)<\/a>/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [_fullMatch, _href, linkText] = match;
    const index = match.index;

    // Add plain text before the link
    if (index > lastIndex) {
      elements.push(text.slice(lastIndex, index));
    }

    // Add only the link text as plain text
    elements.push(linkText);

    lastIndex = regex.lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return <>{elements}</>;
}

