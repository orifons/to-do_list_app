import { Check, Circle } from "lucide-react";

function TaskStatus({ completed }: { completed: boolean }) {
  return (
    <span
      className={
        completed
          ? "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400"
          : "inline-flex shrink-0 items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-700 dark:text-amber-400"
      }
    >
      {completed ? (
        <Check className="size-3" aria-hidden="true" />
      ) : (
        <Circle className="size-2.5" aria-hidden="true" />
      )}
      {completed ? "Completed" : "Pending"}
    </span>
  );
}

export default TaskStatus