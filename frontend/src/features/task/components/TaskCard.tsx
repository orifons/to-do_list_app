import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { taskTypeLabels, type Task } from "@/features/task/types";

import TaskMetadata from "@/features/task/components/TaskMetaData";
import TaskSelectionControl from "@/features/task/components/TaskSelectionControl";
import TaskStatus from "@/features/task/components/TaskStatus";

function TaskCard({
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
    <Card
      className={`group h-full rounded-2xl border-0 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
        selected ? "ring-2 ring-primary/45" : "ring-1 ring-border/80"
      }`}
    >
      <CardContent className="flex h-full flex-col p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <TaskSelectionControl
            task={task}
            selected={selected}
            selectionMode={selectionMode}
            onToggleSelection={onToggleSelection}
          />
          <TaskStatus completed={task.completed} />
        </div>
        <div className="mb-5">
          <span className="mb-2 inline-block text-[10px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {taskTypeLabels[task.task_type]}
          </span>
          <h2 className={task.completed ? "mb-2 font-semibold text-muted-foreground line-through" : "mb-2 font-semibold"}>
            {task.title}
          </h2>
          <p className="line-clamp-3 min-h-5 text-sm leading-relaxed text-muted-foreground">
            {task.description || "No description"}
          </p>
        </div>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border/70 pt-4">
          <TaskMetadata task={task} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-label={`View details for ${task.title}`}
            onClick={() => onViewDetails(task.id)}
            className="rounded-xl"
          >
            View details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default TaskCard