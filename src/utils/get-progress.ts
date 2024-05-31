import { FlatChecklist } from "../data/schema";

export function getProgress(checklist: FlatChecklist) {
  const numItems = checklist.filter((item) => !item.disabled).length;
  const numCheckedItems = checklist.filter(
    (item) => item.status === "done" && !item.disabled
  ).length;
  return Math.round((numCheckedItems / numItems) * 100);
}
