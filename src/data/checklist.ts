export const defaultChecklist = [
  {
    category: "Category 1",
    title: "Name",
    criteria:
      "Is the name of the component consistent with the codebase and documentation?",
    checked: false,
  },
  {
    category: "Category 1",
    title: "Layers",
    criteria:
      "Are layer names formatted with meaningful values? (No Frame 234)",
    checked: false,
  },
  {
    category: "Category 1",
    title: "Color styles",
    criteria:
      "Are all the colors from a style library / token and not hard-coded?",
    checked: false,
  },
  {
    category: "Category 2",
    title: "Text styles",
    criteria: "Is each text layer from a defined text style library / token?",
    checked: false,
  },
  {
    category: "Category 2",
    title: "Spacing, padding and alignment",
    criteria:
      "Are spacing, padding, and alignment values consistently applied and visually aligned?",
    checked: false,
  },
  {
    category: "Category 2",
    title: "Variants and component properties",
    criteria:
      "Are variant and component properties correctly named? Consistent with code and among other components?",
    checked: false,
  },
  {
    category: "Category 2",
    title: "States",
    criteria:
      "Are all the interactive states accounted for? (e.g., hover, focus, pressed)",
    checked: false,
  },
  {
    category: "Category 3",
    title: "Content",
    criteria:
      "Does the component behave as expected with non-optimal concent is present? (e.g., long strings)",
    checked: false,
  },
  {
    category: "Category 3",
    title: "Layout",
    criteria:
      "Does the component behave as expected when resized? (e.g., wrapping, alignment, text layer flow)",
    checked: false,
  },
  {
    category: "Category 3",
    title: "Configuration",
    criteria:
      "Can all the required variations and states be acheived through the component properties panel? \n(e.g., no digging through Layers)",
    checked: false,
  },
  {
    category: "Category 3",
    title: "Accessibility",
    criteria:
      "Are color combinations accessible WCAG AAA compliant? Do focusable elements have a defined focus order?",
    checked: false,
  },
];
