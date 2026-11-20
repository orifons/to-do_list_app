import authStore from "@/features/auth/store/auth";
import { Link } from "react-router";
import { Check } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const { user } = authStore()

  return (
    <header className="mb-10 flex items-center justify-between border-b border-border/70 pb-5">
      <Link to="/tasks" className="flex items-center gap-3" aria-label="CoreTask, tareas">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <span className="font-semibold tracking-tight">coretask</span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-muted-foreground sm:inline">Tu espacio de trabajo</span>
        <ModeToggle />
        <Avatar size="lg">
          <AvatarImage src={user?.avatar.image} alt={`@${user?.username}`} />
          <AvatarFallback>{`${user?.first_name} ${user?.last_name}`}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

export default Navbar