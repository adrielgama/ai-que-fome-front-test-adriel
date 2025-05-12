import { Skeleton } from '../ui/skeleton'

export default function SkeletonList({ qtd = 3, title = 'Carregando...' }) {
  return (
    <div className="space-y-4 px-4 py-6">
      <h2 className="text-xl font-extrabold text-purple-500">{title}</h2>
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
        {[...Array(qtd)].map((_, index) => (
          <div
            key={index}
            className="flex w-full items-center gap-4 rounded-md bg-neutral-50"
          >
            <Skeleton className="size-[4.5rem] rounded-none rounded-l-md bg-neutral-200" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-20 bg-neutral-200" />
              <Skeleton className="h-6 w-32 bg-neutral-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
