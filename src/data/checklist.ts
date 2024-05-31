import { FlatChecklistSchema } from "./schema";

type ChecklistData = Array<ChecklistCategory>;

interface ChecklistCategory {
  title: string;
  note?: string;
  tasks: Array<ChecklistItem>;
}

interface ChecklistItem {
  title: string;
  note?: string;
  required: boolean;
  subTasks?: Array<ChecklistItem>;
}

const checklistData: ChecklistData = [
  {
    title: "Product",
    tasks: [
      {
        title: "Design meets all specified business and user requirements.",
        required: true,
      },
      {
        title:
          "Design maximizes the use of available library components, styles, and variables.",
        required: true,
      },
      {
        title:
          "Design is [responsive](https://zod.dev/) across small, medium, and large screens.",
        required: true,
      },
      {
        title:
          "Design is checked and annotated with the [Include](https://zod.dev/) accessibility plugin.",
        required: true,
      },
      {
        title:
          "Design provides [documentation](https://zod.dev/), including user flows, wireframes, and interaction specs.",
        required: true,
      },
      {
        title: "Design includes a high fidelity end-to-end prototype.",
        required: false,
      },
      {
        title:
          "Validate the design through user testing and ensure it adheres to usability standards.",
        required: false,
      },
    ],
  },
  {
    title: "Content",
    note: "When a team does not have a dedicated content designer, it's the PMs responsibility to determine if there are strings that are critical and should be reviewed. PDs and PMs can use the #ask-content channel to get feedback.",
    tasks: [
      {
        title:
          "Content created by a team with a dedicated content designer has been reviewed.",
        required: true,
      },
      {
        title:
          "Content follows the [eBay Style Guide](https://zod.dev/) and Design Playbook standards.",
        required: true,
      },
      {
        title:
          "Everyone identified in the project [RASCI](https://zod.dev/) has been engaged, as described.",
        required: true,
      },
      {
        title: "The design refers to the [L10n checklist](https://zod.dev/).",
        required: true,
      },
    ],
  },
  {
    title: "User Experience",
    tasks: [
      {
        title:
          "Problem statement is user-centered and informed by the User Researcher.",
        required: true,
      },
      {
        title: "User Researcher has given feedback for the design.",
        required: true,
      },
      {
        title:
          "Clear articulation of how the proposed solution addresses user problems and needs identified in the problem statement.",
        required: true,
      },
      {
        title:
          "Related research cited and any future research needs identified and scoped with the User Researcher.",
        required: true,
      },
      {
        title: "The design complies with the [UX Tenets](https://zod.dev/).",
        required: true,
      },
    ],
  },
  {
    title: "Figma Standards",
    tasks: [
      {
        title:
          "The Figma file follows [eBay's standards for structure and naming conventions](https://zod.dev/).",
        required: true,
        subTasks: [
          {
            title: "File structure",
            required: true,
          },
          {
            title: "Index card",
            required: true,
          },
          {
            title:
              "Designer pushed the design to a branch dedicated for developers.",
            required: true,
          },
        ],
      },
      {
        title:
          "Design utilizes Auto Layout. Design utilizes Frames rather than Groups.",
        required: true,
      },
      {
        title:
          "Any unused assets or outdated versions are cleaned up to prevent confusion.",
        required: true,
      },
    ],
  },
];

export const checklistProcessed = checklistData.map((category, categoryIdx) => {
  const categoryId = `category-${categoryIdx}`;
  const tasks = category.tasks.map((task, taskIdx) => {
    const taskId = `category-${categoryIdx}-task-${taskIdx}`;
    const taskDisabled = task.required ? false : true;
    const taskStatus = "todo";
    const newSubTasks =
      task.subTasks &&
      task.subTasks.map((subTask, subTaskIdx) => {
        const subTaskId = `category-${categoryIdx}-task-${taskIdx}-subtask-${subTaskIdx}`;
        const subTaskDisabled = subTask.required ? false : true;
        const subTaskStatus = "todo";
        return {
          type: "task",
          group: categoryId,
          subGroup: taskId,
          id: subTaskId,
          title: subTask.title,
          status: subTaskStatus,
          note: subTask.note,
          required: subTask.required,
          disabled: subTaskDisabled,
        };
      });
    return {
      type: "task",
      group: categoryId,
      id: taskId,
      title: task.title,
      status: taskStatus,
      note: task.note,
      required: task.required,
      disabled: taskDisabled,
      subTasks: newSubTasks,
    };
  });
  return {
    type: "category",
    id: categoryId,
    title: category.title,
    note: category.note,
    tasks,
  };
});

export function flattenChecklist() {
  const flattenedChecklist = checklistProcessed.reduce((acc, category) => {
    const flatCat = Object.keys(category)
      .filter((objKey) => objKey !== "tasks")
      .reduce((newObj, key) => {
        newObj[key] = category[key];
        return newObj;
      }, {});
    const tasks = category.tasks.reduce((acc, task) => {
      const flatTask = Object.keys(task)
        .filter((objKey) => objKey !== "subTasks")
        .reduce((newObj, key) => {
          newObj[key] = task[key];
          return newObj;
        }, {});
      const subTasks = task.subTasks || [];
      return [...acc, flatTask, ...subTasks];
    }, []);
    return [...acc, flatCat, ...tasks];
  }, []);

  return FlatChecklistSchema.parse(flattenedChecklist);
}
