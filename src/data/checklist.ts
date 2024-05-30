export type ChecklistItem = {
  group: string;
  subgroup?: string;
  title: string;
  note: string;
  status: "todo" | "in-progress" | "done";
  required: boolean;
  disabled: boolean;
};

export type Checklist = Array<ChecklistItem>;

export const defaultChecklist: Array<ChecklistItem> = [
  {
    group: "Category 1",
    title: "Name",
    note: "Is the name of the component consistent with the codebase and documentation?",
    status: "todo",
    required: true,
    disabled: true,
  },
  {
    group: "Category 1",
    title: "Layers",
    note: "Are layer names formatted with meaningful values? (No Frame 234)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 1",
    subgroup: "Layers",
    title: "Subtask One",
    note: "Are layer names formatted with meaningful values? (No Frame 234)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 1",
    subgroup: "Layers",
    title: "Subtask Two",
    note: "Are layer names formatted with meaningful values? (No Frame 234)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 1",
    subgroup: "Layers",
    title: "Subtask Three",
    note: "Are layer names formatted with meaningful values? (No Frame 234)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 1",
    title: "Color styles",
    note: "Are all the colors from a style library / token and not hard-coded?",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 2",
    title: "Text styles",
    note: "Is each text layer from a defined text style library / token?",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 2",
    title: "Spacing, padding and alignment",
    note: "Are spacing, padding, and alignment values consistently applied and visually aligned?",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 2",
    title: "Variants and component properties",
    note: "Are variant and component properties correctly named? Consistent with code and among other components?",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 2",
    title: "States",
    note: "Are all the interactive states accounted for? (e.g., hover, focus, pressed)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 3",
    title: "Content",
    note: "Does the component behave as expected with non-optimal concent is present? (e.g., long strings)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 3",
    title: "Layout",
    note: "Does the component behave as expected when resized? (e.g., wrapping, alignment, text layer flow)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 3",
    title: "Configuration",
    note: "Can all the required variations and states be acheived through the component properties panel? \n(e.g., no digging through Layers)",
    status: "todo",
    required: true,
    disabled: false,
  },
  {
    group: "Category 3",
    title: "Accessibility",
    note: "Are color combinations accessible WCAG AAA compliant? Do focusable elements have a defined focus order?",
    status: "todo",
    required: true,
    disabled: false,
  },
];
