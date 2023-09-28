export function createRandomImages(quantity: number) {
  const images = []
  for (let i = 0; i < quantity; i++) {
    const randomNum = generateRandomNum()
    const newImage = `https://picsum.photos/id/${randomNum}/400/300`
    images.push(newImage)
  }
  return images
}

export function generateRandomNum() {
  const randomNum = Math.ceil(Math.random() * 100)
  return randomNum
}
