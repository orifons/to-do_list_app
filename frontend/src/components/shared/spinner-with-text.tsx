import { Spinner } from "@/components/ui/spinner";

function SpinnerWithText({ textValue }: { textValue: string }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Spinner />
      <p className="line-clamp-1">{textValue}</p>
    </div>
  )
}

export { SpinnerWithText };
