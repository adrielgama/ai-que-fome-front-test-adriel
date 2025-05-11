export default function EmptyCart() {
  return (
    <main className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <p className="text-lg font-bold text-neutral-700">
        Seu ticket está vazio.
      </p>
      <p className="text-sm text-neutral-500">
        Adicione itens para visualizar aqui.
      </p>
    </main>
  )
}
