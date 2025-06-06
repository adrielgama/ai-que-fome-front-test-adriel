import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative aspect-[3/1] w-full">
      <Image
        src="/images/banner.webp"
        fill
        alt="banner"
        className="mt-px object-cover"
        priority
        fetchPriority="high"
      />
    </div>
  )
}
