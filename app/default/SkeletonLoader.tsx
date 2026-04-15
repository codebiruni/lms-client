import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonLoader() {
  return (
    <div className="flex flex-col space-y-3 p-4 w-full rounded-xl max-w-100">
      {/* Top Banner/Image Placeholder */}
      <Skeleton className="h-31.25 w-full rounded-xl" />
      
      <div className="space-y-2">
        {/* Title Placeholder */}
        <Skeleton className="h-4 w-62.5" />
        
        {/* Subtitle/Description Placeholder */}
        <Skeleton className="h-4 w-50" />
      </div>

      <div className="flex items-center space-x-4 pt-4">
        {/* User Avatar Placeholder */}
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          {/* User Name/Info Placeholder */}
          <Skeleton className="h-4 w-37.5" />
          <Skeleton className="h-4 w-25" />
        </div>
      </div>
    </div>
  )
}