import { useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

import { useTheme } from "@/components/theme";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import "@/components/shared/styles.css"

type ThemeOption = "light" | "dark" | "system";
type LabelPhase = "idle" | "exit" | "enter";

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [labelPhase, setLabelPhase] = useState<LabelPhase>("idle")
  const [pendingTheme, setPendingTheme] = useState<ThemeOption | null>(null)

  const handleThemeSelect = (nextTheme: ThemeOption) => {
    if (nextTheme === theme) {
      if (pendingTheme) {
        setPendingTheme(null)
        setLabelPhase("idle")
      }
      return
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPendingTheme(null)
      setLabelPhase("idle")
      setTheme(nextTheme)
      return
    }

    setPendingTheme(nextTheme)
    setLabelPhase("exit")
  }

  const handleLabelAnimationEnd = () => {
    if (labelPhase === "exit" && pendingTheme) {
      setTheme(pendingTheme)
      setPendingTheme(null)
      setLabelPhase("enter")
    } else if (labelPhase === "enter") {
      setLabelPhase("idle")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="default" className="relative inline-flex h-10 w-fit items-center rounded-full pl-3 pr-3">
            <Sun
              className={cn(
                "absolute left-3 top-1/2 h-[1.2rem] w-[1.2rem] -translate-y-1/2 transition-[opacity,rotate,scale] duration-300 ease-in-out motion-reduce:transition-none",
                theme === "light"
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 rotate-90 opacity-0"
              )}
              aria-hidden="true"
            />
            <Moon
              className={cn(
                "absolute left-3 top-1/2 h-[1.2rem] w-[1.2rem] -translate-y-1/2 transition-[opacity,rotate,scale] duration-300 ease-in-out motion-reduce:transition-none",
                theme === "dark"
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 rotate-90 opacity-0"
              )}
              aria-hidden="true"
            />
            <Monitor
              className={cn(
                "absolute left-3 top-1/2 h-[1.2rem] w-[1.2rem] -translate-y-1/2 transition-[opacity,rotate,scale] duration-300 ease-in-out motion-reduce:transition-none",
                theme === "system"
                  ? "scale-100 rotate-0 opacity-100"
                  : "scale-0 rotate-90 opacity-0"
              )}
              aria-hidden="true"
            />
            <span
              className={cn(
                "ml-7 inline-block w-fit overflow-hidden text-left capitalize",
                labelPhase === "exit" && "theme-label-exit",
                labelPhase === "enter" && "theme-label-enter"
              )}
              onAnimationEnd={handleLabelAnimationEnd}
            >
              {theme}
            </span>
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeSelect("light")}>
          <Sun className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("dark")}>
          <Moon className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeSelect("system")}>
          <Monitor className="h-[1.2rem] w-[1.2rem]" aria-hidden="true" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}