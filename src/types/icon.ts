type IconProps = React.SVGAttributes<SVGElement> & {
  size?: string | number
  color?: string
}

type IconGraphicProps = Omit<IconProps, 'color'>

export type { IconProps, IconGraphicProps }
