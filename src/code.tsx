const { widget } = figma;
const { useSyncedState, AutoLayout } = widget;
import Header from "./components/Header/index";
import ChecklistGroup from "./components/ChecklistGroup/index";
import { getProgress } from "./utils/get-progress";
import { flattenChecklist } from "./data/checklist";
import type { FlatChecklist, FlatChecklistItem } from "./data/schema";

function Widget() {
  const [newChecklist, setNewChecklist] = useSyncedState("newChecklist", () =>
    flattenChecklist()
  );

  const categories = newChecklist.filter((item) => item.type === "category");
  const tasks = newChecklist.filter((item) => item.type === "task");
  const percentComplete = getProgress(tasks);

  function updateChecked(item: FlatChecklistItem) {
    const nextChecklist = _updateChecked(item, newChecklist);
    setNewChecklist(nextChecklist);
  }

  return (
    <AutoLayout
      direction="vertical"
      fill="#FFFFFF"
      spacing={32}
      width={800}
      padding={{
        top: 32,
        right: 32,
        bottom: 32,
        left: 32,
      }}
    >
      <Header title="Design Preflight" percentComplete={percentComplete} />
      {categories.map((category) => {
        return (
          <ChecklistGroup
            key={category.id}
            title={category.title}
            note={category.note}
            items={tasks.filter((task) => task.id.includes(category.id))}
            updateChecked={updateChecked}
          />
        );
      })}
    </AutoLayout>
  );
}

widget.register(Widget);

// -----------------------------------------------
// HELPER FUNCTIONS
// -----------------------------------------------
function _updateChecked(item: FlatChecklistItem, checklist: FlatChecklist) {
  const categories = checklist.filter((i) => i.type === "category");
  const tasks = checklist.filter((i) => i.type === "task");

  const activeItemIndex = tasks.findIndex((element) => element.id === item.id);
  const nextItem = tasks[activeItemIndex];

  const nextStatus =
    nextItem.status === "todo" || nextItem.status === "in-progress"
      ? "done"
      : "todo";
  nextItem.status = nextStatus;

  if (nextItem.subGroup) {
    const [parentTask] = tasks.filter((item) => nextItem.id.includes(item.id));
    const siblingTasks = tasks.filter(
      (item) =>
        item.subGroup === nextItem.subGroup &&
        item.id !== nextItem.id &&
        !item.disabled
    );
    const siblingTasksDone = siblingTasks.filter(
      (item) => item.status === "done"
    );
    if (nextStatus === "done") {
      const allSubtasksDone = siblingTasksDone.length === siblingTasks.length;
      parentTask.status = allSubtasksDone ? "done" : "in-progress";
      console.log("parentTask", parentTask);
    } else {
      const noSubtasksDone = siblingTasksDone.length === 0;
      parentTask.status = noSubtasksDone ? "todo" : "in-progress";
      console.log("parentTask", parentTask);
    }
  } else {
    ``;
    const subtasks = tasks.filter(
      (item) => item.id.includes(nextItem.id) && !item.disabled
    );
    subtasks.forEach((subtask) => {
      subtask.status = nextStatus;
    });
  }

  return [...categories, ...tasks];
}
