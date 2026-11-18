import { Button } from '@/components/ui/button';
import {
  Item,
  ItemContent,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";

function ButtonWithSpinner({ textValue }: { textValue: string }) {
  return (
    <Button >
      <Item variant="muted">
        <ItemMedia>
          <Spinner />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="line-clamp-1">{textValue}</ItemTitle>
        </ItemContent>
      </Item>
    </Button>
  )
}

export { ButtonWithSpinner };
