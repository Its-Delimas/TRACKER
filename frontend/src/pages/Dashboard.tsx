import { useState } from 'react'
import Timer from '../components/Timer'
import SessionList from '../components/SessionList'
import Navbar from '../components/Navbar'

interface Session {
    duration: number
    date: string
}

export default function Dashboard() {
    const [sessions, setSessions] = useState<Session[]>([])

    const handleSave = (seconds: number) => {
        const newSession: Session = {
            duration: seconds,
            date: new Date().toISOString()
        }
        setSessions(prev => [...prev, newSession])
    }

    const getDailyTotal = () => {
        const today = new Date().toDateString()
        const total = sessions
            .filter(s => new Date(s.date).toDateString() === today)
            .reduce((acc, s) => acc + s.duration, 0)

        const mins = Math.floor(total / 60)
        const secs = total % 60
        return `${mins}m ${secs}s`
    }

    const getStreak = () => {
        if (sessions.length === 0) return 0

        const uniqueDays = [
            ...new Set(
                sessions.map(s => new Date(s.date).toDateString())
            )
        ]
            .map(d => new Date(d))
            .sort((a, b) => b.getTime() - a.getTime())

        let streak = 1
        for (let i = 0; i < uniqueDays.length - 1; i++) {
            const diff = uniqueDays[i].getTime() - uniqueDays[i + 1].getTime()
            const oneDay = 1000 * 60 * 60 * 24
            if (diff === oneDay) {
                streak++
            } else {
                break
            }
        }

        return streak
    }

    return (
        <div>
            <Navbar />
            <Timer onSave={handleSave} />
            <p>Total Today: {getDailyTotal()}</p>
            <p>Streak: {getStreak()} days</p>
            <SessionList sessions={sessions} />
        </div>
    )
}