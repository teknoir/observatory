import { createContext, useState } from "react"
import { MainImageCarouselContextProps } from "ts/types"

export const mainImageCarouselContext = createContext<MainImageCarouselContextProps | undefined>(undefined)

export const HomeDataProvider = ({ children }: { children: any }) => {
  const [mainImageCarousel, setMainImageCarousel] = useState("")

  return (
    <mainImageCarouselContext.Provider value={{ mainImageCarousel, setMainImageCarousel }}>
      {children}
    </mainImageCarouselContext.Provider>
  )
}
