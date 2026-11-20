import authStore from "@/features/auth/store/auth";
import { LogOut } from "lucide-react";

import { Link } from "react-router";
import { Check } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const { user, signOut } = authStore()

  return (
    <header className="mb-10 flex items-center justify-between border-b border-border/70 pb-5">
      <Link to="/tasks" className="flex items-center gap-3" aria-label="CoreTask, tareas">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <span className="font-semibold tracking-tight">coretask</span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden text-sm sm:inline">
          <span className="text-muted-foreground">Tu espacio de trabajo</span>
          {" "}
          <span className="font-extrabold">({user?.username})</span>
        </span>
        <Avatar size="lg">
          <AvatarImage src={user?.avatar.image} alt={`@${user?.username}`} />
          <AvatarFallback>{`${user?.first_name} ${user?.last_name}`}</AvatarFallback>
        </Avatar>
        <ModeToggle />
        <Button
          className={"rounded-3xl"}
          variant="outline"
          size="icon"
          onClick={signOut}
        >
          <LogOut />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  )
}

export default Navbar