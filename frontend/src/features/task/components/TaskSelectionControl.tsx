import type { Task } from "@/features/task/types";
import TaskTypeIcon from "./TaskTypeIcon";

type TaskSelectionControlProps = {
  task: Task;
  selected: boolean;
  selectionMode: boolean;
  onToggleSelection: (taskId: number) => void;
};

function TaskSelectionControl({
  task,
  selected,
  selectionMode,
  onToggleSelection,
}: TaskSelectionControlProps) {
  return (
    <span className="relative flex size-11 shrink-0 items-center justify-center">
      <span
        className={`absolute inset-0 m-auto flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary transition-opacity ${
          selectionMode || selected
            ? "opacity-0"
            : "opacity-0 md:opacity-100 md:group-hover:opacity-0 md:group-focus-within:opacity-0"
        }`}
        aria-hidden="true"
      >
        <TaskTypeIcon type={task.task_type} />
      </span>
      <label
        className={`absolute inset-0 z-10 flex size-11 cursor-pointer items-center justify-center rounded-xl transition-opacity focus-within:ring-2 focus-within:ring-ring/50 ${
          selectionMode || selected
            ? "bg-primary/5 opacity-100"
            : "bg-background opacity-100 md:pointer-events-none md:bg-transparent md:opacity-0 md:group-hover:pointer-events-auto md:group-hover:bg-primary/5 md:group-hover:opacity-100 md:group-focus-within:pointer-events-auto md:group-focus-within:bg-primary/5 md:group-focus-within:opacity-100"
        }`}
      >
        <input
          type="checkbox"
          checked={selected}
          aria-label={`Select ${task.title}`}
          onChange={() => onToggleSelection(task.id)}
          className="size-4 cursor-pointer accent-primary"
        />
      </label>
    </span>
  );
}

export default TaskSelectionControl;
