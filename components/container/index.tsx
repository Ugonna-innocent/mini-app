import { cn } from "@/lib/utils"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

const Container = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        className,
        "mx-auto w-[80%] max-w-[81rem] max-md:w-[90%] max-sm:w-[95%]"
      )}
    >
      {children}
    </div>
  )
}

export default Container
