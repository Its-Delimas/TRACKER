import { useState } from 'react'
import Timer from '../components/Timer'
import SessionList from '../components/SessionList'
import Navbar from '../components/Navbar'
import { Flame, Clock } from 'lucide-react'

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
        <div className='min-h-screen bg-gray-900'>
            <Navbar />
            <div className='w-full px-12'>
                <Timer onSave={handleSave} />

                <div className='grid grid-cols-2 gap-4 mb-12'>

                    <div className='relative rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-6 overflow-hidden'>
                        <div className='absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5' />
                        <div className='flex items-center gap-2 mb-4'>
                            <Clock size={14} className='text-red-500' />
                            <span className='text-gray-500 text-xs tracking-widest uppercase'>Today</span>
                        </div>
                        <p className='text-white text-4xl font-semibold tracking-tight' style={{ fontFamily: 'JetBrains Mono, monospace' }}>{getDailyTotal()}</p>
                        <p className="text-gray-600 text-xs mt-1">Total focus time</p>
                    </div>

                    <div className='relative rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-6 overflow-hidden'>
                        <div className='absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5' />
                        <div className='flex items-center gap-2 mb-4'>
                            <Flame size={14} className='text-red-500' />
                            <span className='text-gray-500 text-xs tracking-widest uppercase'>Streak</span>
                        </div>
                        <p className='text-white text-4xl font-semibold tracking-tight' style={{ fontFamily: 'JetBrains Mono, monospace' }}>{getStreak()}</p>
                        <p className='text-gray-600 text-xs mt-1'>consecutive days</p>
                    </div>
                </div>
                <SessionList sessions={sessions} />
            </div>

        </div>
    )
}