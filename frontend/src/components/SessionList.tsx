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
        return <p>No sessions yet today.</p>
    }

    return (
        <ul>
            {sessions.map((session, index) => (
                <li key={index}>
                    {formatDuration(session.duration)} - {formatTime(session.date)}
                </li>
            ))}
        </ul>
    )
}