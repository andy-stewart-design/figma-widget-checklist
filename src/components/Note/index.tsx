const { widget } = figma;
import Markdown from "../Markdown";
const { AutoLayout, Text } = widget;

export default function Note({ text }: { text: string }) {
  return (
    <AutoLayout
      width="fill-parent"
      fill={"#EFEFEF"}
      padding={20}
      spacing={12}
      cornerRadius={8}
    >
      <Text fontSize={16} lineHeight={24} fontWeight={600} opacity={0.7}>
        Note
      </Text>
      <Markdown
        text={text}
        width="fill-parent"
        fontSize={16}
        lineHeight={24}
        opacity={0.7}
      />
    </AutoLayout>
  );
}
