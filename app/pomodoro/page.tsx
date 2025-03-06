"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

type Mode = "work" | "shortBreak" | "longBreak"

interface ModeConfig {
  label: string
  duration: number
  color: string
}

export default function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<Mode>("work")
  const [cycles, setCycles] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const modes: Record<Mode, ModeConfig> = {
    work: { label: "Work", duration: 25, color: "bg-red-500" },
    shortBreak: { label: "Short Break", duration: 5, color: "bg-green-500" },
    longBreak: { label: "Long Break", duration: 15, color: "bg-blue-500" },
  }

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            clearInterval(intervalRef.current as NodeJS.Timeout)
            setIsActive(false)
            handleTimerComplete()
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        } else {
          setSeconds(seconds - 1)
        }
      }, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isActive, minutes, seconds])

  const handleTimerComplete = () => {
    // Play sound
    const audio = new Audio("/notification.mp3")
    audio.play().catch((e) => console.log("Audio play failed:", e))

    // Switch modes
    if (mode === "work") {
      const newCycles = cycles + 1
      setCycles(newCycles)

      if (newCycles % 4 === 0) {
        switchMode("longBreak")
      } else {
        switchMode("shortBreak")
      }
    } else {
      switchMode("work")
    }
  }

  const switchMode = (newMode: Mode) => {
    setMode(newMode)
    setMinutes(modes[newMode].duration)
    setSeconds(0)
  }

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    setMinutes(modes[mode].duration)
    setSeconds(0)
  }

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Pomodoro Timer</h1>

      <div className="bg-gray-900 rounded-lg p-6 mb-8 border border-gray-800">
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            {(Object.keys(modes) as Mode[]).map((key) => (
              <Button
                key={key}
                variant={mode === key ? "neon" : "outline"}
                size="sm"
                onClick={() => {
                  if (
                    !isActive ||
                    window.confirm("Are you sure you want to switch modes? Your current timer will be reset.")
                  ) {
                    switchMode(key)
                  }
                }}
              >
                {modes[key].label}
              </Button>
            ))}
          </div>
        </div>

        <div className={`text-8xl font-bold text-center mb-8 ${isActive ? "text-accent" : "text-gray-300"}`}>
          {formatTime(minutes)}:{formatTime(seconds)}
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="neon" size="lg" onClick={toggleTimer} className="w-24">
            {isActive ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>

          <Button variant="outline" size="lg" onClick={resetTimer} className="w-24">
            <RotateCcw className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2" /> Settings
        </h2>

        <div className="space-y-4">
          {(Object.keys(modes) as Mode[]).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-2">{modes[key].label} Duration (minutes)</label>
              <input
                type="number"
                min="1"
                max="60"
                value={modes[key].duration}
                className="w-full rounded-md border border-gray-700 bg-gray-950 px-3 py-2 text-sm"
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value)
                  if (value > 0 && value <= 60) {
                    modes[key].duration = value
                    if (mode === key && !isActive) {
                      setMinutes(value)
                    }
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

