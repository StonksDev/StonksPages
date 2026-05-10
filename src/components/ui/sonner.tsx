"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      expand={true}
      visibleToasts={5}
      gap={16}
      duration={6000}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-transparent group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg backdrop-blur-xl",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      style={
        {
          "--normal-bg": "hsla(240, 10%, 4%, 0.9)",
          "--normal-border": "rgba(255, 255, 0.2)",
          "--normal-text": "hsl(0, 0%, 100%)",
          "--success-bg": "hsla(158, 80%, 20%, 0.95)",
          "--success-border": "hsla(158, 88%, 40%, 1)",
          "--success-text": "hsl(0, 0%, 100%)",
          "--error-bg": "hsla(0, 84%, 20%, 0.95)",
          "--error-border": "hsla(0, 84%, 50%, 1)",
          "--error-text": "hsl(0, 0%, 100%)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

