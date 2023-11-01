import { createContext, useState } from "react"

export const mainImageCarouselContext = createContext({})

export const HomeDataProvider = ({ children }: { children: any }) => {
  const [mainImageCarousel, setMainImageCarousel] = useState("")

  return (
    <mainImageCarouselContext.Provider value={{ mainImageCarousel, setMainImageCarousel }}>
      {children}
    </mainImageCarouselContext.Provider>
  )
}
