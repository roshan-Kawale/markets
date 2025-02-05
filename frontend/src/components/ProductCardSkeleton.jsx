import { Card, CardContent, CardFooter } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

export default function ProductCardSkeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden group dark bg-[#121212]">
      <CardContent className="p-0">
        <div className="relative aspect-square w-full overflow-hidden">
          <Skeleton className="w-full h-96" />
        </div>
        <div className="p-4">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <Skeleton className="h-4 w-4 mr-1" />
              <Skeleton className="h-4 w-8 mr-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex gap-14 justify-between items-center">
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-12" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </CardFooter>
    </Card>
  )
}

