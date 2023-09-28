enum CarouselMode {
  General = "general",
  Detail = "detail"
}

interface Source {
  src: string
}

export interface SurveillanceCarouselProps {
  mode: CarouselMode
}

export interface CarouselProps {
  sources: Source["src"][]
  mainSource: number
  setMainSource: (index: number) => void
}

export interface SurveillanceCarouselModeParams {
  imagesSrc: Array<string>
  mainImage: number
  setMainImage: Function
}

export interface ImageProps {
  src: string
}

export interface VideoProps {
  src: string
}
