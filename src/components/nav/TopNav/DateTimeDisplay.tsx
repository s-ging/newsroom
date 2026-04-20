// components/nav/TopNav/DateTimeDisplay.tsx
'use client'

import { useEffect, useRef, useState } from 'react'

export default function DateTimeDisplay() {
  const [now, setNow] = useState<Date | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    setNow(new Date())

    const msToNextMinute = 60_000 - (Date.now() % 60_000)
    const timeout = setTimeout(() => {
      setNow(new Date())
      intervalRef.current = setInterval(() => setNow(new Date()), 60_000)
    }, msToNextMinute)

    return () => {
      clearTimeout(timeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  if (!now) return null

  const datePart = now.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).replace(',', '')

  const utc8Time = now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Singapore'
  })

  const jstTime = now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Tokyo'
  })

  const timezones = [
    { code: 'SGT', time: utc8Time, offset: '+8' },
    { code: 'HKT', time: utc8Time, offset: '+8' },
    { code: 'JST', time: jstTime, offset: '+9' }
  ]

  return (
    <p className="flex flex-row nav-middle-text m-0 text-sm">
      <span className="date-part">{datePart}</span>
      <span className="separator"></span>

      {timezones.map((tz, index) => (
        <span key={tz.code} className="timezone-item flex flex-row">
          <span className="time">{tz.time}</span>
          <span className="code ml-1">{tz.code}</span>
          <span className="offset text-gray-400 ml-1">(UTC{tz.offset})</span>
          {index < timezones.length - 1 && (
            <span className="separator"></span>
          )}
        </span>
      ))}
    </p>
  )
}
