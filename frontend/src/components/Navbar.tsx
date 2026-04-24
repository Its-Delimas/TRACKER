import { Terminal } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="w-full px-12 py-4 flex items-center justify-between border-b border-gray-800/80 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">

            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Terminal size={14} className="text-green-500" />
                </div>
                <span className="text-white font-semibold text-sm tracking-tight">
                    itracker
                </span>
            </div>

            <div className="flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 rounded-full px-3 py-1">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-gray-400 text-xs tracking-widest uppercase">
                    Phase 1
                </span>
            </div>

        </nav>
    )
}