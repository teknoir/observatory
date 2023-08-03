import { useEffect, useState } from "react"

function wsConnect(url: string) {
  const [data, setData] = useState([])

  useEffect(() => {
    const ws = new WebSocket(url)

    ws.onopen = () => {
      console.log("WebSocket connection established")
    }

    ws.onmessage = event => {
      try {
        const newData = JSON.parse(event.data)
        setData(newData)
      } catch (error) {
        console.error("Error parsing WebSocket data: ", error)
      }
    }

    ws.onclose = () => {
      console.log("WebSocket connection closed")
    }

    // return () => {
    //   ws.close()
    // }

  }, [url])

  return data
}

export default wsConnect

export function isDev(): boolean {
  const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === "development"
  return development
}

