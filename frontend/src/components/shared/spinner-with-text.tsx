import { Spinner } from "@/components/ui/spinner";

function SpinnerWithText({ textValue }: { textValue: string }) {
  return (
    <div className="flex flex-row w-full justify-between gap-4">
    <p className="line-clamp-1">{textValue}</p>
      <Spinner />
    </div>
  )
}

export { SpinnerWithText };
