import { useTimer } from '../hooks/useTimer'
import { Play, Square, RotateCcw, Save } from 'lucide-react';

interface TimerProps {
    onSave: (seconds: number) => void
}

export default function Timer({ onSave }: TimerProps) {
    const { seconds, isRunning, start, stop, reset } = useTimer();

    const formatTime = (s: number) => {
        const hrs = Math.floor(s / 3600)
        const mins = Math.floor((s % 3600) / 60)
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

            <div className='font-mono text-9xl font-bold tracking-tight mb-2' style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className={isRunning ? 'text-white' : 'text-gray-600'}>{formatTime(seconds)}</span>
            </div>

            <div className={`w-6 h-6 rounded-full mb-12 transition-all duration-500 ${isRunning ? 'bg-green-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] animate-pulse' : 'bg-gray-700'}`} />

            <div className='flex items-center gap-3'>
                <button onClick={start} disabled={isRunning} className='flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-500 hover:bg-green-400 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-medium transition-all duration-200'>
                    <Play size={14} />
                    Start
                </button>

                <button onClick={stop} disabled={!isRunning} className='flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 disabled:opacity-20 disabled:cursor-not-allowed text-gray-300 hover:text-white text-sm font-medium transition-all duration-200 bg-red-500 hover:bg-red-400'>
                    <Square size={14} />
                    Stop
                </button>

                <button onClick={reset} className='flex items-center gap-2 px-6 py-2.5 rounded-lg border border-gray-700 hover:border-gray-500 text-gray-500 hover:text-white transition-all duration-200'><RotateCcw size={14} />
                    Reset
                </button>

                <button onClick={handleSave} disabled={isRunning || seconds === 0} className='flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700 hover:border-gray=500/50 text-gray-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed texxt-gray-300 hover:text-red-400 text-sm font-medium transition-all duration-200'>
                    <Save size={14} />
                    Save
                </button>
            </div>
        </div>
    )
}