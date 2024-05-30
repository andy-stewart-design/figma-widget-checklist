const { widget } = figma;
const { AutoLayout } = widget;
import ChecklistItem from "../ChecklistItem/index";
import Header from "../Header/index";
import { getProgress } from "../../utils/get-progress";
import { type Checklist, defaultChecklist } from "../../data/checklist";

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
  const percentComplete = getProgress(items);

  const tasks = items.filter((item) => !item.subgroup);
  const subtasks = items
    .filter((item) => item.subgroup)
    .reduce((acc: Record<string, Checklist>, item) => {
      const key = item.subgroup;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {});

  return (
    <AutoLayout name="Checklist Group" direction="vertical" spacing={28}>
      <Header title={title} percentComplete={percentComplete} size="md" />
      <AutoLayout
        name="Checklist Group Items"
        direction="vertical"
        spacing={12}
      >
        {tasks.map((item) => {
          const subs = subtasks[item.title];
          return (
            <AutoLayout
              key={item.title}
              name="Checklist Group Items"
              direction="vertical"
              spacing={12}
            >
              <ChecklistItem item={item} updateChecked={updateChecked} />
              {subs && (
                <AutoLayout
                  name="Subtasks"
                  direction="vertical"
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
