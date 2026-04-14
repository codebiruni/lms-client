import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLoader() {
  return (
    <div className="flex flex-col space-y-3 p-4 border rounded-xl max-w-[400px]">
      {/* Top Banner/Image Placeholder */}
      <Skeleton className="h-[125px] w-full rounded-xl" />
      
      <div className="space-y-2">
        {/* Title Placeholder */}
        <Skeleton className="h-4 w-[250px]" />
        
        {/* Subtitle/Description Placeholder */}
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <div className="flex items-center space-x-4 pt-4">
        {/* User Avatar Placeholder */}
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          {/* User Name/Info Placeholder */}
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  )
}