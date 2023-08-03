import { useEffect, useState } from "react"

function Carousel() {
  const [mainImage, setMainImage] = useState(0)
  const [imagesSrc, setImagesSrc] = useState<string[]>([])

  useEffect(() => {
    setImagesSrc(createRandomImages(3))
  }, [])

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

export default Carousel 
