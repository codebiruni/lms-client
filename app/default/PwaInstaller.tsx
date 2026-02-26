/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from "react"
import useContextData from "./custom-component/useContextData"
import { useRouter } from "next/navigation"

interface Props {
  children?: React.ReactNode
}

export default function PwaInstaller({ children }: Props) {
  const {UserData} = useContextData()
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showMessage, setShowMessage] = useState<string | null>(null)
  const router = useRouter()


  // Detect install availability
  useEffect(() => {

    // detect if already installed
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsInstalled(true)
    }

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)

  }, [])


  if (UserData && isInstalled) {
    if (UserData.role === 'student') {
        router.push("/profile")
    } else {
        router.push("/dashboard")
    }
  }


  // Install handler
  const handleInstall = async () => {

    if (isInstalled) {
      showPopup("✅ App is already installed")
      return
    }

    if (!deferredPrompt) {
      showPopup("⚠️ Install not available on this device")
      return
    }

    deferredPrompt.prompt()

    const choice = await deferredPrompt.userChoice

    if (choice.outcome === "accepted") {

      showPopup("🎉 App installed successfully!")
      setIsInstalled(true)

    } else {

      showPopup("❌ Installation cancelled")

    }

    setDeferredPrompt(null)
  }



  const showPopup = (message: string) => {

    setShowMessage(message)

    setTimeout(() => {
      setShowMessage(null)
    }, 3000)

  }



  return (
    <>
    
      {/* Installer button wrapper */}
      <div
        onClick={handleInstall}
        className="cursor-pointer inline-block"
      >
        {children ? children : (

          <div className="px-5 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition active:scale-95 shadow-md">
            Install App
          </div>

        )}
      </div>



      {/* Popup message */}
      {showMessage && (

        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-999">

          <div className="bg-black text-white px-6 py-3 rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-4">

            {showMessage}

          </div>

        </div>

      )}

    </>
  )

}