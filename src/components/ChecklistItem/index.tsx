const { widget } = figma;
const { AutoLayout, Text, SVG } = widget;
import { defaultChecklist } from "../../data/checklist";
import { iconChecked, iconUnchecked } from "../icons";

interface PropTypes {
  item: (typeof defaultChecklist)[number];
  updateChecked: (item: (typeof defaultChecklist)[number]) => void;
}

export default function ChecklistItem({ item, updateChecked }: PropTypes) {
  return (
    <AutoLayout
      name="Checklist Item"
      overflow="visible"
      spacing={24}
      width={900}
      verticalAlignItems="start"
      padding={{
        top: 0,
        right: 0,
        bottom: 12,
        left: 0,
      }}
    >
      <SVG
        name="Checklist Icon"
        src={item.checked ? iconChecked : iconUnchecked}
        onClick={() => updateChecked(item)}
      />
      <AutoLayout
        name="Checklist Text"
        overflow="visible"
        direction="vertical"
        spacing={8}
        width="fill-parent"
      >
        <Text
          name="Title"
          fill="#000"
          fontFamily="Inter"
          fontSize={20}
          fontWeight={500}
        >
          {item.title}
        </Text>
        <Text name="Description" fill="#555" fontFamily="Inter">
          {item.criteria}
        </Text>
      </AutoLayout>
    </AutoLayout>
  );
}
