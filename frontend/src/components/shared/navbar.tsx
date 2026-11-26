import authStore from "@/features/auth/store/auth";
import { LogOut } from "lucide-react";

import { Link } from "react-router";
import { Check } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function Navbar() {
  const { user, signOut } = authStore()
  const avatarFallBack = (user?.first_name && user.last_name)
    ? `${user?.first_name.charAt(0)}${" "}${user.last_name.charAt(0)}`
    : `${user?.username.includes("_")
      ? user.username.split("_").map((part) => part.charAt(0)).join("").toUpperCase()
      : user?.username.slice(0, 2).toUpperCase()}`

  return (
    <header className="sticky top-0 z-50 mb-8 border-b border-border/70 backdrop-blur-3xl">
      <nav className="mx-auto flex h-18 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Main navigation">
        <Link
          to="/tasks"
          className="group flex items-center gap-3 rounded-lg outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="CoreTask, tasks"
        >
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform group-hover:scale-[1.03]">
            <Check className="size-4.5" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">CoreTask</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="mr-1 hidden items-center text-sm md:flex">
            <span className="text-muted-foreground">Your workspace</span>
            <span className="ml-1.5 font-semibold text-foreground">{user?.username}</span>
          </div>

          <Avatar size="lg" className="size-9 ring-1 ring-border/70">
            <AvatarImage src={user?.avatar?.image} alt={`@${user?.username}`} />
            <AvatarFallback>
              <span className="text-xs font-bold">{avatarFallBack}</span>
            </AvatarFallback>
          </Avatar>

          <div className="mx-1 hidden h-5 w-px bg-border sm:block" aria-hidden="true" />

          <ModeToggle />
          <Button
            className="size-10 rounded-full"
            variant="ghost"
            size="icon"
            onClick={signOut}
            title="Sign out"
          >
            <LogOut className="size-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar