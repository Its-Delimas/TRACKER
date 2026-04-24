import { useState, useEffect, useRef } from 'react'

export function useTimer() {
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => prev + 1)
            }, 1000)
        } else {
            clearInterval(intervalRef.current!)
        }

        return () => clearInterval(intervalRef.current!)
    }, [isRunning])

    const start = () => setIsRunning(true);
    const stop = () => setIsRunning(false);
    const reset = () => {
        setIsRunning(false)
        setSeconds(0)
    }

    return { seconds, isRunning, start, stop, reset }
}