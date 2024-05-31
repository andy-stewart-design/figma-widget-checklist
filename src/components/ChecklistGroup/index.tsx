const { widget } = figma;
const { AutoLayout, Text } = widget;
import ChecklistItem from "../ChecklistItem/index";
import Header from "../Header/index";
import Note from "../Note";
import { FlatChecklist, FlatChecklistItem } from "../../data/schema";
import { getProgress } from "../../utils/get-progress";

interface PropTypes {
  title: string;
  note?: string;
  items: FlatChecklist;
  updateChecked: (item: FlatChecklistItem) => void;
}

export default function ChecklistGroup({
  title,
  note,
  items,
  updateChecked,
}: PropTypes) {
  const percentComplete = getProgress(items);

  const tasks = items.filter((item) => !item.subGroup);
  const subtasks = items
    .filter((item) => item.subGroup)
    .reduce((acc: Record<string, FlatChecklist>, item) => {
      const key = item.subGroup;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

  return (
    <AutoLayout
      name="Checklist Group"
      direction="vertical"
      width="fill-parent"
      spacing={28}
    >
      <Header title={title} percentComplete={percentComplete} size="md" />
      {note && <Note text={note} />}
      <AutoLayout
        name="Checklist Group Items"
        direction="vertical"
        width="fill-parent"
        spacing={12}
      >
        {tasks.map((item) => {
          const subs = subtasks[item.id];
          return (
            <AutoLayout
              key={item.title}
              name="Checklist Group Items"
              direction="vertical"
              spacing={12}
              width="fill-parent"
            >
              <ChecklistItem item={item} updateChecked={updateChecked} />
              {subs && (
                <AutoLayout
                  name="Subtasks"
                  direction="vertical"
                  width="fill-parent"
                  spacing={12}
                  padding={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 48,
                  }}
                >
                  {subs.map((subitem) => (
                    <ChecklistItem
                      key={subitem.title}
                      item={subitem}
                      updateChecked={updateChecked}
                    />
                  ))}
                </AutoLayout>
              )}
            </AutoLayout>
          );
        })}
      </AutoLayout>
    </AutoLayout>
  );
}
