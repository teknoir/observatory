import { useEffect, useState } from "react"
import { useInterval } from "usehooks-ts"
import { createRandomImages } from "./utils"
import SurveillanceCarouselGeneral from "./General"
import SurveillanceCarouselDetail from "./Detail"
import { SurveillanceCarouselProps } from "../../ts/types"


const surveillanceCarouselComponentsByMode = {
  "general": SurveillanceCarouselGeneral,
  "detail": SurveillanceCarouselDetail,
}

export const SurveillanceCarousel = ({ mode }: SurveillanceCarouselProps) => {
  const [mainImage, setMainImage] = useState(0)
  const [imagesSrc, setImagesSrc] = useState<Array<string>>([])

  useEffect(() => {
    setImagesSrc(createRandomImages(100))
  }, [])

  useInterval(() => {
    if (imagesSrc && imagesSrc.length > 0) {
      setMainImage(prevImgIndex => {
        let newIndex = 0
        if (prevImgIndex < imagesSrc.length) {
          newIndex = prevImgIndex + 1
        }
        return newIndex
      })
    }
  }, 2000)

  const Component = surveillanceCarouselComponentsByMode[mode]
  if (!Component) return null

  return (
    <Component
      sources={imagesSrc}
      mainSource={mainImage}
      setMainSource={setMainImage}
    />
  )
}


