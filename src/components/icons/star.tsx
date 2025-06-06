import { cn } from '@/lib/utils'
import { IconGraphicProps } from '@/types/icon'

const Star = ({ className, size, ...props }: IconGraphicProps) => {
  const computedProps = size
    ? { ...props, width: size, height: size }
    : { ...props }

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('max-h-full max-w-full', className)}
      {...computedProps}
    >
      <g clipPath="url(#clip0_2455_2662)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.4026 3.99268C11.056 2.66911 12.9437 2.66911 13.5971 3.99268L15.4632 7.7726C15.5041 7.85549 15.5833 7.91304 15.675 7.92636L15.6854 7.92787L19.4795 8.53335C20.4326 8.67477 21.0029 9.49147 21 10.307C20.9984 10.7494 20.8315 11.1986 20.4807 11.5507L17.8332 14.4953L17.8154 14.5126C17.7492 14.5771 17.719 14.6701 17.7346 14.7611L18.4474 18.9157C18.6971 20.371 17.1693 21.4797 15.863 20.7932L12.1308 18.8317C12.0489 18.7886 11.9509 18.7886 11.8689 18.8317L8.13679 20.7932C6.83046 21.4797 5.30269 20.371 5.55237 18.9157L6.26515 14.7611C6.28077 14.6701 6.25059 14.5771 6.18433 14.5126L6.16659 14.4953L3.51927 11.5507C3.16854 11.1986 3.00159 10.7494 3.00001 10.307C2.99709 9.49148 3.56739 8.67478 4.52045 8.53336L8.32476 7.92629C8.41645 7.91297 8.49562 7.85549 8.53654 7.7726L10.4026 3.99268Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2455_2662">
          <rect width="24" height="24" fill="currentColor" />
        </clipPath>
      </defs>
    </svg>
  )
}

export { Star }
