import { ImageProps } from "ts/types"

function CarrouselImage({ src }: ImageProps) {
  return (
    <img
      className="w-full"
      src={src}
    />
  )
}

export default CarrouselImage
