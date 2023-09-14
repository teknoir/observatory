import { useEffect, useState } from "react"
import { useInterval } from "usehooks-ts"

interface SurveillanceCarouselParams {
  mode: "general" | "detail"
}

interface SurveillanceCarouselModeParams {
  imagesSrc: Array<string>
  mainImage: number
  setMainImage: Function
}

const surveillanceCarouselComponentsByMode = {
  "general": SurveillanceCarouselGeneral,
  "detail": SurveillanceCarouselDetail,
}

function createRandomImages(quantity: number) {
  const images = []
  for (let i = 0; i < quantity; i++) {
    const randomNum = generateRandomNum()
    const newImage = `https://picsum.photos/id/${randomNum}/400/300`
    images.push(newImage)
  }
  return images
}

function generateRandomNum() {
  const randomNum = Math.ceil(Math.random() * 100)
  return randomNum
}

export const SurveillanceCarousel = ({ mode }: SurveillanceCarouselParams) => {
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
      imagesSrc={imagesSrc}
      mainImage={mainImage}
      setMainImage={setMainImage}
    />
  )
}

function SurveillanceCarouselGeneral({ imagesSrc, mainImage, setMainImage }: SurveillanceCarouselModeParams) {
  return (
    <section className="grid grid-cols-3 max-h-[100%] w-full h-[500px]">
      <img
        src={imagesSrc[mainImage]}
        className="w-full"
      />
      <div className="grid grid-cols-2 overflow-y-scroll">
        {
          imagesSrc.length > 0 && imagesSrc.map((imageSrc, index) =>
            <img key={imagesSrc + '_' + index} src={imageSrc}
              className={`p-3 ${mainImage === index ? "border border-red-200" : ""}`}
              onClick={() => setMainImage(index)}
            />
          )
        }
      </div>
    </section>
  )
}

function SurveillanceCarouselDetail({ imagesSrc, mainImage, setMainImage }: SurveillanceCarouselModeParams) {
  return (
    <section className="flex flex-col">
      <img src={imagesSrc[mainImage]} />
      <div className="flex">
        <button>&lt;</button>
        <div className="flex flex-row overflow-auto">
          {
            imagesSrc.length > 0 && imagesSrc.map((imageSrc, index) =>
              <img key={imagesSrc + '' + index} src={imageSrc}
                className="p-3"
                onClick={() => setMainImage(index)}
              />
            )
          }
        </div>
        <button>&gt;</button>
      </div>
    </section>
  )
}
