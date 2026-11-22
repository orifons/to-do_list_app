import { LoaderCircle } from "lucide-react";

function TextWithLoader({ textValue }: { textValue: string }) {
  return (
    <span className="flex flex-row w-full justify-between">
      {textValue}
      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
    </span>
  )
}

export { TextWithLoader };
