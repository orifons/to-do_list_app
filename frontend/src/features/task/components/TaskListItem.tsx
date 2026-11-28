import { Button } from "@/components/ui/button";
import { taskTypeLabels, type Task } from "@/features/task/types";
import TaskSelectionControl from "@/features/task/components/TaskSelectionControl";
import TaskMetadata from "./TaskMetaData";
import TaskStatus from "./TaskStatus";

function TaskListItem({
  task,
  onViewDetails,
  selected,
  selectionMode,
  onToggleSelection,
}: {
  task: Task;
  onViewDetails: (taskId: number) => void;
  selected: boolean;
  selectionMode: boolean;
  onToggleSelection: (taskId: number) => void;
}) {
  return (
    <article className={`group flex flex-col gap-3 border-b px-4 py-5 transition-colors last:border-b-0 hover:bg-muted/30 sm:flex-row sm:items-center sm:gap-5 sm:px-5 ${
      selected ? "border-primary/30 bg-muted/40" : "border-border/70"
    }`}>
      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        <TaskSelectionControl
          task={task}
          selected={selected}
          selectionMode={selectionMode}
          onToggleSelection={onToggleSelection}
        />
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
      <div className="flex shrink-0 items-center gap-3 self-end sm:self-auto">
        <TaskStatus completed={task.completed} />
        <Button
          type="button"
          variant="outline"
          size="sm"
          aria-label={`View details for ${task.title}`}
          onClick={() => onViewDetails(task.id)}
          className="rounded-xl"
        >
          Details
        </Button>
      </div>
    </article>
  );
}

export default TaskListItem;