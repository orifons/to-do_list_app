import { taskTypeLabels, type Task } from "@/features/task/types";
import TaskMetadata from "./TaskMetaData";
import TaskStatus from "./TaskStatus";
import TaskTypeIcon from "./TaskTypeIcon";

function TaskListItem({ task }: { task: Task }) {
  return (
    <article className="group flex flex-col gap-3 border-b border-border/70 px-4 py-5 transition-colors last:border-b-0 hover:bg-muted/30 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/5 text-primary">
          <TaskTypeIcon type={task.task_type} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1.5 flex flex-wrap items-center gap-2">
            <h2 className={task.completed ? "font-medium text-muted-foreground line-through" : "font-semibold"}>
              {task.title}
            </h2>
            <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
              {taskTypeLabels[task.task_type]}
            </span>
          </div>
          {task.description && (
            <p className="mb-2 line-clamp-1 text-sm text-muted-foreground">
              {task.description}
            </p>
          )}
          <TaskMetadata task={task} />
        </div>
      </div>
      <TaskStatus completed={task.completed} />
    </article>
  );
}

export default TaskListItem;