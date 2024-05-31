import { z } from "zod";

export const ChecklistItemSchema = z.object({
  type: z.enum(["task", "category"]),
  id: z.string(),
  title: z.string(),
  group: z.string().optional(),
  subGroup: z.string().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  required: z.boolean().optional(),
  disabled: z.boolean().optional(),
  note: z.string().optional(),
  subTasks: z.array(z.string()).optional(),
});

export const FlatChecklistSchema = z.array(ChecklistItemSchema);

export type FlatChecklist = z.infer<typeof FlatChecklistSchema>;
export type FlatChecklistItem = z.infer<typeof ChecklistItemSchema>;
