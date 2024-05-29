const { widget } = figma;
const { useSyncedState, AutoLayout } = widget;
import Header from "./components/Header/index";
import ChecklistGroup from "./components/ChecklistGroup/index";
import { defaultChecklist } from "./data/checklist";

function Widget() {
  const [checklist, setChecklist] = useSyncedState(
    "checklist",
    () => defaultChecklist
  );

  const checklistGrouped = Object.entries(
    checklist.reduce((acc: Record<string, typeof defaultChecklist>, item) => {
      const key = item.category;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    }, {})
  );

  const numItems = checklist.length;
  const numCheckedItems = checklist.filter((item) => item.checked).length;
  const percentComplete = Math.round((numCheckedItems / numItems) * 100);

  function updateChecked(item: (typeof defaultChecklist)[number]) {
    const nextChecklist = [...checklist];
    const activeItemIndex = checklist.findIndex(
      (element) => element.title === item.title
    );
    nextChecklist[activeItemIndex].checked =
      !nextChecklist[activeItemIndex].checked;
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
