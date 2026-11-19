import { Check, MapPin, Video } from "lucide-react";

import type { Task } from "@/features/task/types";


function TaskTypeIcon({ type }: { type: Task["task_type"] }) {
  if (type === "appointment") return <MapPin aria-hidden="true" />;
  if (type === "conference") return <Video aria-hidden="true" />;
  return <Check aria-hidden="true" />;
}

export default TaskTypeIcon