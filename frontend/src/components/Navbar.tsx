import { Terminal, LogOut, LayoutDashboard, History, BarChart2, User } from 'lucide-react'

interface NavbarProps {
    onLogout: () => void
    email?: string
}

export default function Navbar({ onLogout, email }: NavbarProps) {
    return (
        <nav className="w-full px-8 py-0 flex items-center justify-between border-b border-gray-800/80 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50 h-14">

            {/* LEFT — Logo */}
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Terminal size={13} className="text-red-500" />
                </div>
                <span className="text-white font-semibold text-sm tracking-tight">
                    devtracker
                </span>
            </div>

            {/* CENTER — Nav links */}
            <div className="hidden md:flex items-center gap-1">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white bg-gray-800/80 border border-gray-700/50 text-xs font-medium transition-all duration-200">
                    <LayoutDashboard size={12} />
                    Dashboard
                </button>

                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-400 text-xs font-medium transition-all duration-200 cursor-not-allowed relative group">
                    <History size={12} />
                    History
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 text-gray-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Coming soon
                    </span>
                </button>

                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-600 hover:text-gray-400 text-xs font-medium transition-all duration-200 cursor-not-allowed relative group">
                    <BarChart2 size={12} />
                    Stats
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 text-gray-400 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                        Coming soon
                    </span>
                </button>
            </div>

            {/* RIGHT — User + Logout */}
            <div className="flex items-center gap-3">

                {/* Phase badge */}
                <div className="hidden sm:flex items-center gap-2 bg-gray-800/60 border border-gray-700/50 rounded-full px-3 py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-gray-400 text-xs tracking-widest uppercase">
                        Phase 2
                    </span>
                </div>

                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center">
                    <User size={12} className="text-gray-400" />
                </div>

                {/* Email — desktop only */}
                {email && (
                    <span className="hidden lg:block text-gray-500 text-xs truncate max-w-32">
                        {email}
                    </span>
                )}

                {/* Logout */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 text-gray-600 hover:text-red-400 text-xs transition-colors duration-200 border border-transparent hover:border-red-500/20 hover:bg-red-500/5 px-2.5 py-1.5 rounded-lg"
                >
                    <LogOut size={12} />
                    <span className="hidden sm:block">Logout</span>
                </button>
            </div>
        </nav>
    )
}