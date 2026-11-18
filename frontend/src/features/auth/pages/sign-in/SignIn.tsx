import { ModeToggle } from "@/components/shared/mode-toggle";
import { LoginForm } from "@/features/auth/components/SignIn-Form";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <ModeToggle />
        <LoginForm />
      </div>
    </div>
  )
}
