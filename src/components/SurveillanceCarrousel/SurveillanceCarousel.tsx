import { createContext, useState, useEffect, useContext } from "react"
import { useInterval } from "usehooks-ts"
import { mainImageCarouselContext } from 'context/HomeContext/mainImageCarouselContext';
import { SurveillanceCarouselProps, CarouselMode, MainImageCarouselContextProps } from "ts/types"
import SurveillanceCarouselGeneral from "./General"
import SurveillanceCarouselDetail from "./Detail"
// import GridViewControls from "./GridViewControls"
import GridViewProvider from "./GridViewContext"


const surveillanceCarouselComponentsByMode = {
  [CarouselMode.General]: SurveillanceCarouselGeneral,
  [CarouselMode.Detail]: SurveillanceCarouselDetail,
}

export const GridViewContext = createContext("")

const SurveillanceCarousel = ({ mode, sources }: SurveillanceCarouselProps) => {
  const [mainImage, setMainImage] = useState('')
  const { mainImageCarousel, setMainImageCarousel } = useContext(mainImageCarouselContext) as MainImageCarouselContextProps

  const sourcesSize = sources.size;

  useEffect(() => {
    if (!mainImage && sources.size > 0) {
      setMainImage(sources.keys().next().value)
    }
  }, [mainImage, sourcesSize])

  useEffect(() => {
    if (mainImageCarousel) {
      setMainSource(mainImageCarousel)
      setMainImageCarousel("")
    }
  }, [mainImageCarousel])

  useInterval(() => {
    if (sources.size > 0) {
      setMainImage(prevImgIndex => {
        const ids = [...sources.keys()];
        let newIndex = '';
        const mainIdx = ids.findIndex(id => id === prevImgIndex);
        if (!mainImage) {
          newIndex = ids[0];
        } else {
          newIndex = ids[mainIdx + 1] || ids[0];
        }
        return newIndex
      })
    }
  }, 60000)

  const setMainSource = (cameraId: string) => {
    setMainImage(cameraId)
  }

  const Component = surveillanceCarouselComponentsByMode[mode]
  if (!Component) return null

  return (
    <GridViewProvider>
      {/*<GridViewControls />*/}
      <Component
        sources={sources}
        mainSource={mainImage}
        setMainSource={setMainSource}
      />
    </GridViewProvider>
  )
}

export default SurveillanceCarousel;
