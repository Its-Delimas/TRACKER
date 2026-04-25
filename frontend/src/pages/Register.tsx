import { useState } from 'react'
import { registerUser } from '../services/api'
import { Terminal, ArrowRight, LogIn } from 'lucide-react'

interface RegisterProps {
    onRegister: (email: string) => void
    onSwitch: () => void
}

export default function Register({ onRegister, onSwitch }: RegisterProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!email || !password || !confirm) {
            setError('Please fill in all fields')
            return
        }
        if (password !== confirm) {
            setError('Passwords do not match')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        try {
            setLoading(true)
            setError('')
            const res = await registerUser(email, password)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.user.id)
            onRegister(email)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 flex">

            {/* LEFT PANEL */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden border-r border-gray-800 flex-col justify-between p-12">

                {/* Grid decoration */}
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Geometric circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-64 h-64 rounded-full border border-gray-800 flex items-center justify-center">
                        <div className="w-48 h-48 rounded-full border border-gray-700/50 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full border border-red-500/20 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                                    <Terminal size={20} className="text-red-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-12 right-12 w-24 h-24 border-t border-r border-gray-700/50" />
                <div className="absolute bottom-12 left-12 w-24 h-24 border-b border-l border-gray-700/50" />

                {/* Dot grid accent */}
                <div className="absolute top-32 left-16 grid grid-cols-5 gap-2">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <div key={i} className={`w-1 h-1 rounded-full ${i % 6 === 0 ? 'bg-red-500/60' : 'bg-gray-700'}`} />
                    ))}
                </div>

                {/* Horizontal lines accent */}
                <div className="absolute right-16 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-px bg-gray-700"
                            style={{ width: `${(i % 3 + 1) * 20}px` }}
                        />
                    ))}
                </div>

                {/* Top content */}
                <div className="relative flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                        <Terminal size={14} className="text-red-500" />
                    </div>
                    <span className="text-white font-semibold text-sm tracking-tight">devtracker</span>
                </div>

                {/* Bottom content */}
                <div className="relative">
                    <h2 className="text-white text-2xl font-semibold tracking-tight leading-snug mb-3">
                        Your sessions.<br />
                        <span className="text-gray-500">Your progress.</span>
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                        Join developers who track focused work time, build streaks, and ship more consistently.
                    </p>
                    <div className="flex items-center gap-2 mt-6">
                        <div className="flex -space-x-2">
                            {['E', 'M', 'K', 'A'].map((letter, i) => (
                                <div
                                    key={i}
                                    className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-400 font-medium"
                                >
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-500 text-xs">
                            Join 2,400+ developers
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">

                    {/* Mobile logo */}
                    <div className="flex lg:hidden items-center justify-center gap-2 mb-10">
                        <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                            <Terminal size={14} className="text-red-500" />
                        </div>
                        <span className="text-white font-semibold text-sm">devtracker</span>
                    </div>

                    <h1 className="text-white text-2xl font-semibold tracking-tight mb-1">
                        Create account
                    </h1>
                    <p className="text-gray-500 text-sm mb-8">
                        Start tracking your dev sessions today
                    </p>

                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-gray-400 text-xs tracking-widest uppercase block mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs tracking-widest uppercase block mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors duration-200"
                            />
                        </div>

                        <div>
                            <label className="text-gray-400 text-xs tracking-widest uppercase block mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                value={confirm}
                                onChange={e => setConfirm(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors duration-200"
                            />
                        </div>

                        {error && (
                            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                                <div className="w-1 h-1 rounded-full bg-red-500" />
                                <p className="text-red-400 text-xs">{error}</p>
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-3 rounded-lg transition-colors duration-200 mt-2"
                        >
                            {loading ? 'Creating account...' : (
                                <>
                                    Create account
                                    <ArrowRight size={14} />
                                </>
                            )}
                        </button>
                    </div>

                    <div className="flex items-center gap-3 my-8">
                        <div className="flex-1 h-px bg-gray-800" />
                        <span className="text-gray-700 text-xs">or</span>
                        <div className="flex-1 h-px bg-gray-800" />
                    </div>

                    <button
                        onClick={onSwitch}
                        className="w-full flex items-center justify-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-400 hover:text-white text-sm py-3 rounded-lg transition-all duration-200"
                    >
                        <LogIn size={14} />
                        Sign in instead
                    </button>

                    <p className="text-gray-700 text-xs text-center mt-8">
                        By creating an account you agree to our{' '}
                        <span className="text-gray-500 hover:text-gray-400 cursor-pointer transition-colors">
                            Terms of Service
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}