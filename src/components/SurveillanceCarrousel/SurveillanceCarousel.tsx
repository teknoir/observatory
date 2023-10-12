import { createContext, useState } from "react"
// import { useInterval } from "usehooks-ts"
import { SurveillanceCarouselProps, CarouselMode } from "ts/types"
import SurveillanceCarouselGeneral from "./General"
import SurveillanceCarouselDetail from "./Detail"
// import GridViewControls from "./GridViewControls"
import GridViewProvider from "./GridViewContext"

const surveillanceCarouselComponentsByMode = {
  [CarouselMode.General]: SurveillanceCarouselGeneral,
  [CarouselMode.Detail]: SurveillanceCarouselDetail,
}

export const GridViewContext = createContext("")

const SurveillanceCarousel = ({ mode, sources: imagesSrc, onSetMainSource }: SurveillanceCarouselProps) => {
  // TODO: use '1' as default camera ID
  const [mainImage, setMainImage] = useState('1')

  // TODO: ask Rodrigo if we still need this
  // useInterval(() => {
  //   if (imagesSrc && imagesSrc.length > 0) {
  //     setMainImage(prevImgIndex => {
  //       let newIndex = 0
  //       if (prevImgIndex < imagesSrc.length) {
  //         newIndex = prevImgIndex + 1
  //       }
  //       return newIndex
  //     })
  //   }
  // }, 2000)

  const setMainSource = (cameraId: string) => {
    setMainImage(cameraId)
    onSetMainSource(cameraId)
  }

  const Component = surveillanceCarouselComponentsByMode[mode]
  if (!Component) return null

  return (
    <GridViewProvider>
      {/*<GridViewControls />*/}
      <Component
        sources={imagesSrc}
        mainSource={mainImage}
        setMainSource={setMainSource}
      />
    </GridViewProvider>
  )
}

export default SurveillanceCarousel;
