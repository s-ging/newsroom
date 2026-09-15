'use client'

import { useEffect, useState } from 'react'

export default function DateDisplay() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const msToNextDay = 86_400_000 - (Date.now() % 86_400_000)
    const timeout = setTimeout(() => {
      setNow(new Date())
    }, msToNextDay)

    return () => clearTimeout(timeout)
  }, [])

  if (!now) return null

  const date = now.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <p className="m-0 text-xs text-gray-400">
      {date}
    </p>
  )
}