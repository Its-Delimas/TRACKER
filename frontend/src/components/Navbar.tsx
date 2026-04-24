export default function navbar() {
    return (
        <nav className="border-b border-gray-800 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-white font-semibold tracking-tight text-sm">
                    i~track
                </span>
            </div>
            <span className="text-gray-600 text-xs tracking-widest uppercase">
                Phase 1
            </span>
        </nav>
    )
}