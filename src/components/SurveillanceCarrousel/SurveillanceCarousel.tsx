import { useState } from "react"
import { useInterval } from "usehooks-ts"
import SurveillanceCarouselGeneral from "./General"
import SurveillanceCarouselDetail from "./Detail"
import { SurveillanceCarouselProps, CarouselMode } from "../../ts/types"

const surveillanceCarouselComponentsByMode = {
  [CarouselMode.General]: SurveillanceCarouselGeneral,
  [CarouselMode.Detail]: SurveillanceCarouselDetail,
}

export const SurveillanceCarousel = ({ mode, sources: imagesSrc }: SurveillanceCarouselProps) => {
  const [mainImage, setMainImage] = useState(0)

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


