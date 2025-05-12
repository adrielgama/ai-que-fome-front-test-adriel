import { Badge } from '@/components/ui/badge'

interface Props {
  title: string
  description?: string
  required?: boolean
  children: React.ReactNode
}

export default function DetailSection({
  title,
  description,
  required,
  children,
}: Props) {
  return (
    <div className="mb-4 border-b-4 border-neutral-100">
      <div className="space-y-5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">{title}</h3>
            <p className="text-xs font-bold text-neutral-500">{description}</p>
          </div>
          {required && (
            <Badge className="rounded-sm bg-neutral-700 px-2 py-1.5">
              obrigatório
            </Badge>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
