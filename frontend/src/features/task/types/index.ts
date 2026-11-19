export type Task = {
  id: number;
  title: string;
  description: string | null;
  task_type: "task" | "appointment" | "conference";
  due_date: string;
  completed: boolean;
  location: string | null;
  meeting_link: string | null;
  created_at: string;
  updated_at: string;
};

export type TaskResponse = Task[] | { results: Task[] };
export type TaskFilter = "all" | "pending" | "completed";
export type ViewMode = "list" | "cards";

const taskTypeLabels: Record<Task["task_type"], string> = {
  task: "Tarea",
  appointment: "Presencial",
  conference: "Videollamada",
};

export { taskTypeLabels }