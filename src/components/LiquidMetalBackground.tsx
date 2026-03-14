import { useEffect, useState, useRef } from "react"
import { Warp } from "@paper-design/shaders-react"

export function LiquidMetalBackground() {
  const [mounted, setMounted] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number | null>(null)
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    const animate = () => {
      const lerp = 0.04
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp
      setMousePos({ x: currentRef.current.x, y: currentRef.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("mousemove", handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  if (!mounted) {
    return <div className="absolute inset-0 -z-10 bg-[#00042e]" />
  }

  const swirl = 0.3 + mousePos.x * 0.8
  const rotation = (mousePos.y - 0.5) * 0.4
  const distortion = 0.1 + mousePos.x * 0.25 + mousePos.y * 0.15

  return (
    <div className="absolute inset-0 -z-10">
      <Warp
        style={{ width: "100%", height: "100%" }}
        color1="hsla(240, 100%, 5%, 1)"
        color2="hsla(260, 70%, 35%, 1)"
        color3="hsla(280, 50%, 50%, 1)"
        scale={0.5}
        rotation={rotation}
        speed={0.15}
        proportion={0.35}
        softness={1}
        distortion={distortion}
        swirl={swirl}
        swirlIterations={8}
        shapeScale={0.1}
        shape={0}
      />
    </div>
  )
}
