import { ArrowUpRight, Clock3, MapPin, Video } from "lucide-react";
import type { Task } from "@/features/task/types";

const dateFormatter = new Intl.DateTimeFormat("en", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en", {
  hour: "2-digit",
  minute: "2-digit",
});


function formatDueDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Fecha no disponible";
  return `${dateFormatter.format(date)} · ${timeFormatter.format(date)}`;
}

function TaskMetadata({ task }: { task: Task }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="size-3.5" aria-hidden="true" />
        {formatDueDate(task.due_date)}
      </span>
      {task.location && (
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="size-3.5" aria-hidden="true" />
          {task.location}
        </span>
      )}
      {task.meeting_link && (
        <a
          href={task.meeting_link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-primary hover:underline"
        >
          <Video className="size-3.5" aria-hidden="true" />
          Unirse a la reunión
          <ArrowUpRight className="size-3" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}

export default TaskMetadata