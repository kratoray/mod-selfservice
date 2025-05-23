import { Button } from '@/components/atoms/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/molecules/sheet';

export default function VoorbeeldSheet() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-2xl font-bold">Sheet voorbeeld</h1>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Sheet Titel</SheetTitle>
            <SheetDescription>
              Dit is een voorbeeld van een shadcn Sheet component implementatie.
            </SheetDescription>
          </SheetHeader>
          <div className="py-4">Hier kan je eigen content plaatsen.</div>
          <SheetFooter>
            <Button variant="secondary">Annuleren</Button>
            <Button>Opslaan</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
