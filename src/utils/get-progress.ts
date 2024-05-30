import { Checklist } from "../data/checklist";

export function getProgress(checklist: Checklist) {
  const numItems = checklist.filter((item) => !item.disabled).length;
  const numCheckedItems = checklist.filter(
    (item) => item.status === "done" && !item.disabled
  ).length;
  return Math.round((numCheckedItems / numItems) * 100);
}
