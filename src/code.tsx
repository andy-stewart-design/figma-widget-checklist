const { widget } = figma;
const { useSyncedState, AutoLayout } = widget;
import Header from "./components/Header/index";
import ChecklistGroup from "./components/ChecklistGroup/index";
import { getProgress } from "./utils/get-progress";
import { defaultChecklist } from "./data/checklist";
import type { Checklist, ChecklistItem } from "./data/checklist";

function Widget() {
  const [checklist, setChecklist] = useSyncedState(
    "checklist",
    () => defaultChecklist
  );

  const checklistGrouped = Object.entries(
    checklist.reduce((acc: Record<string, Checklist>, item) => {
      const key = item.group;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {})
  );

  const percentComplete = getProgress(checklist);

  function updateChecked(item: ChecklistItem) {
    const nextChecklist = _updateChecked(item, checklist);
    setChecklist(nextChecklist);
  }

  return (
    <AutoLayout
      direction="vertical"
      fill="#FFFFFF"
      spacing={32}
      padding={{
        top: 32,
        right: 32,
        bottom: 32,
        left: 32,
      }}
    >
      <Header
        title="Design Standards Checklist"
        percentComplete={percentComplete}
      />
      {checklistGrouped.map((group) => {
        return (
          <ChecklistGroup
            key={group[0]}
            title={group[0]}
            items={group[1]}
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
function _updateChecked(item: ChecklistItem, checklist: Checklist) {
  const nextChecklist = [...checklist];
  const activeItemIndex = nextChecklist.findIndex(
    (element) => element.title === item.title
  );
  const nextItem = nextChecklist[activeItemIndex];

  const { status } = nextItem;
  const nextStatus =
    status === "todo" || status === "in-progress" ? "done" : "todo";
  nextItem.status = nextStatus;

  if (nextItem.subgroup) {
    const [parentTask] = nextChecklist.filter(
      (item) => item.title === nextItem.subgroup
    );
    const siblingTasks = nextChecklist.filter(
      (item) =>
        item.subgroup === nextItem.subgroup && item.title !== nextItem.title
    );
    const siblingTasksDone = siblingTasks.filter(
      (item) => item.status === "done"
    );
    if (nextStatus === "done") {
      const allSubtasksDone = siblingTasksDone.length === siblingTasks.length;
      parentTask.status = allSubtasksDone ? "done" : "in-progress";
    } else {
      const noSubtasksDone = siblingTasksDone.length === 0;
      parentTask.status = noSubtasksDone ? "todo" : "in-progress";
    }
  } else {
    const subtasks = nextChecklist.filter(
      (item) => item.subgroup === nextItem.title
    );
    subtasks.forEach((subtask) => {
      subtask.status = nextStatus;
    });
  }

  return nextChecklist;
}
