import { Clock } from 'lucide-react'

interface Session {
    duration: number
    date: string
}

interface SessionListProps {
    sessions: Session[]
}

export default function SessionList({ sessions }: SessionListProps) {

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}m ${secs}s`
    }

    const formatTime = (dateStr: string) => {
        return new Date(dateStr).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    if (sessions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 border border-dashed border-gray-800 rounded-xl">
                <Clock size={20} className="text-gray-700 mb-3" />
                <p className='text-gray-600 text-sm'>No sessions saved yet</p>
                <p className='text-gray-700 text-xs mt-1'>Start the timer to begin tracking</p>
            </div>
        )
    }

    return (
        <div className='border border-gray-800 rounded-xl overflow-hidden'>
            <div className='flex items-center justify-between px-5 py-3 border-b border-gray-800'>
                <span className='text-gray-500 text-xs tracking-widest uppercase'>
                    Sessions
                </span>
                <span className='text-gray-700 text-xs'>
                    {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}
                </span>
            </div>

            <ul>
                {[...sessions].reverse().map((session, index) => (
                    <li key={index} className='flex items-center justify-between px-5 py-4 border-b border-gray-800/50 last:border-0 hover:bg-gray-800/20 transition-colors duration-150'>
                        <div className='flex items-center gap-3'>
                            <div className='w-1.5 h-1.5 rounded-full bg-red-500/60' />
                            <span className='text-white text-sm font-medium' style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                                {formatDuration(session.duration)}
                            </span>
                        </div>
                        <span className='text-gray-600 text-xs'>
                            {formatTime(session.date)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}