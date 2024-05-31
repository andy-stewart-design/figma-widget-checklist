const { widget } = figma;
const { Fragment, Text, Span } = widget;

type TextPropsWithoutChildren = Omit<TextProps, "children">;

interface PropTypes extends TextPropsWithoutChildren {
  text: string;
}

export default function Markdown({
  text,
  fontSize = 20,
  lineHeight = 28,
  fill = "#000000",
  fontWeight = 400,
  ...restProps
}: PropTypes) {
  const content = parseMarkdownLinks(text);

  return (
    <Text
      {...restProps}
      name="Text"
      fill={fill}
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={lineHeight}
      width="fill-parent"
    >
      {content.map((part) => {
        if (part.type === "link")
          return (
            <Span key={part.content} href={part.href} fill="#0000FF">
              {part.content}
            </Span>
          );
        else return <Span key={part.content}>{part.content}</Span>;
      })}
    </Text>
  );
}

type Part =
  | { type: "text"; content: string }
  | { type: "link"; content: string; href: string };

function parseMarkdownLinks(str: string): Part[] {
  // Define the regex pattern to extract all links
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  const parts: Part[] = [];
  let lastIndex = 0;

  // Loop through all matches
  while ((match = linkPattern.exec(str)) !== null) {
    const textBefore = str.slice(lastIndex, match.index);
    const linkText = match[1];
    const linkHref = match[2];

    // Push the text before the link if it exists
    if (textBefore) {
      parts.push({ type: "text", content: textBefore });
    }

    // Push the link object
    parts.push({ type: "link", content: linkText, href: linkHref });

    // Update lastIndex to the end of the current match
    lastIndex = match.index + match[0].length;
  }

  // Push the remaining text after the last link
  if (lastIndex < str.length) {
    parts.push({ type: "text", content: str.slice(lastIndex) });
  }

  return parts;
}
