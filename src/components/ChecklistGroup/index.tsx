const { widget } = figma;
const { AutoLayout } = widget;
import ChecklistItem from "../ChecklistItem/index";
import Header from "../Header/index";
import { defaultChecklist } from "../../data/checklist";

interface PropTypes {
  title: string;
  items: Array<(typeof defaultChecklist)[number]>;
  updateChecked: (item: (typeof defaultChecklist)[number]) => void;
}

export default function ChecklistGroup({
  title,
  items,
  updateChecked,
}: PropTypes) {
  const numItems = items.length;
  const numCheckedItems = items.filter((item) => item.checked).length;
  const percentComplete = Math.round((numCheckedItems / numItems) * 100);

  return (
    <AutoLayout
      name="Checklist Group"
      direction="vertical"
      fill="#FFFFFF"
      spacing={28}
    >
      <Header title={title} percentComplete={percentComplete} size="md" />
      <AutoLayout
        name="Checklist Group Items"
        direction="vertical"
        fill="#FFFFFF"
        spacing={12}
      >
        {items.map((item) => {
          return (
            <ChecklistItem
              key={item.title}
              item={item}
              updateChecked={updateChecked}
            />
          );
        })}
      </AutoLayout>
    </AutoLayout>
  );
}
