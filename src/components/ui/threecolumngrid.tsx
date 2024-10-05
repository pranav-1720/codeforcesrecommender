import { Card, CardContent } from "@/components/ui/card"

interface GridItem {
  name: string;
  value: string | number;
}

interface TwoColumnGridProps {
  items: GridItem[] | null;
  classname?: string;
}

export function ThreeColumnGrid({ items, classname }: TwoColumnGridProps = { items: [], classname: "" }) {
  return (
    <Card className={`w-full max-w-2xl mx-auto ${classname}`}>
      {/* <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader> */}
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items?.map((item, index) => (
            <div key={index} className="flex flex-col space-y-1  items-center justify-center  mt-6">
              <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
              <span className="text-lg font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}