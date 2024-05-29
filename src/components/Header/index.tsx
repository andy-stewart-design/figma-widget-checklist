const { widget } = figma;
const { AutoLayout, Text } = widget;

interface PropTypes {
  size?: "lg" | "md";
  title: string;
  percentComplete: number;
}

export default function Header({
  size = "lg",
  title,
  percentComplete,
}: PropTypes) {
  return (
    <AutoLayout
      name="Header"
      direction="horizontal"
      width="fill-parent"
      spacing="auto"
      verticalAlignItems="baseline"
    >
      <Text
        name="Header Title"
        fill="#000"
        fontFamily="Inter"
        fontSize={size === "lg" ? 40 : 27}
        fontWeight={700}
      >
        {title}
      </Text>
      <Text
        name="Percent Complete"
        fill="#555"
        fontFamily="Inter"
        fontWeight={500}
      >
        {percentComplete}% Complete
      </Text>
    </AutoLayout>
  );
}
