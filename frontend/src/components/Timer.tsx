import { useTimer } from '../hooks/useTimer'
import { Play, Square, RotateCcw, Save } from 'lucide-react';

interface TimerProps {
    onSave: (seconds: number) => void
}

export default function Timer({ onSave }: TimerProps) {
    const { seconds, isRunning, start, stop, reset } = useTimer();

    const formatTime = (s: number) => {
        const hrs = Math.floor(s / 3600)
        const mins = Math.floor((s / 3600) / 60)
        const secs = s % 60
        return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
    }

    const handleSave = () => {
        if (seconds === 0) return
        onSave(seconds)
        reset()
    }

    return (
        <div className='flex flex-col items-center justify-center py-20 px-8'>

            <p className='text-gray-600 text-xs tracking-widest uppercase mb-6'>
                {isRunning ? 'session active' : 'ready'}
            </p>

            <div className='font-mono text-8xl font-bold tracking-tight mb-2' style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className={isRunning ? 'text-white' : 'text-gray-600'}>{formatTime(seconds)}</span>
            </div>

        </div>
    )
}