import { Skeleton } from '@/components/atoms/skeleton';

export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
