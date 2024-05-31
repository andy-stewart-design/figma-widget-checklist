const { widget } = figma;
const { AutoLayout, Text, SVG, Span } = widget;
import { FlatChecklistItem } from "../../data/schema";
import Markdown from "../Markdown";
import { iconTodo, iconDone, iconInProgress } from "../icons";

interface PropTypes {
  item: FlatChecklistItem;
  updateChecked: (item: FlatChecklistItem) => void;
}

export default function ChecklistItem({ item, updateChecked }: PropTypes) {
  const icon =
    item.status === "todo"
      ? iconTodo
      : item.status === "done"
      ? iconDone
      : iconInProgress;

  return (
    <>
      <AutoLayout
        name="Checklist Item"
        overflow="visible"
        width="fill-parent"
        spacing={24}
        verticalAlignItems="start"
        padding={{
          top: 0,
          right: 0,
          bottom: 12,
          left: 0,
        }}
        opacity={item.disabled ? 0.3 : 1}
      >
        <SVG
          name="Checklist Icon"
          src={icon}
          onClick={() => !item.disabled && updateChecked(item)}
        />
        <AutoLayout
          name="Checklist Text"
          overflow="visible"
          direction="vertical"
          spacing={8}
          width="fill-parent"
        >
          <Markdown text={item.title} />
          {item.note && (
            <Text name="Description" fill="#555" fontFamily="Inter">
              {item.note}
            </Text>
          )}
        </AutoLayout>
      </AutoLayout>
    </>
  );
}
