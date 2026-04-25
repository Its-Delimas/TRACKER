import { useState } from 'react'
import { registerUser } from '../services/api'

interface RegisterProps {
    onRegister: () => void
    onSwitch: () => void
}

export default function Register({ onRegister, onSwitch }: RegisterProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!email || !password || !confirmPassword) {
            setError('Please fill an all the passwords')
            return
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }

        if (password.length < 8) {
            setError('Passwords must be atleast 8 characters')
            return
        }
        try {
            setLoading(true)
            setError('')
            const res = await registerUser(email, password)
            localStorage.setitem('token', res.data.token)
            localStorage.setItem('userId', res.data.user.id)
            onRegister()
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
            <div className='w-full max-w-sm'>

                <div className='flex item-center justify-center gap-2 mb-10'>
                    <div className='w-2 h-2 rounded-full bg-green-500' />
                    <span className='text-white font-semibold text-sm tracking-tight'>
                        itracker
                    </span>
                </div>

                <div className='relative rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-8'>
                    <div className='abolute inset-0 rounded-xl ring-1 ring-inset ring-white/5' />

                    <div className='relative'>
                        <h1 className='text-white text-xl font-semibold tracking-tight mb-1'>
                            Create account
                        </h1>
                        <p className='text-gray-500 text-sm mb-8'>
                            start tracking your study session ?
                        </p>
                        <div className='flex flex-col gap-4'>
                            <div>
                                <label className='text-white text-xl font-semibold tarcking-tight mb-1'>
                                    Email
                                </label>
                                <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='you@example.com'
                                    className='w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors duration-200' />
                            </div>
                            <div>
                                <label className='text-gray-400 text-xs tracking-widest uppercase block mb-2'>
                                    Password
                                </label>
                                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='••••••••'
                                    className='w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors duration-200' />
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs tracking-widest uppercase block mb-2">
                                    Confirm Password
                                </label>
                                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••"
                                    className="w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-red-500/50 transition-colors duration-200"
                                />
                            </div>

                            {error && (
                                <p className='text-red-500 text-xs'>{error}</p>
                            )}

                            <button onClick={handleSubmit} disabled={loading} className='w-full bg-red-500 hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200 mt-2'>
                                {loading ? 'Creating account...' : 'Create account'}
                            </button>
                        </div>

                        <p className='text-gray-600 text-xs text-center mt-6'>
                            Already have an account?{' '}
                            <button onClick={onSwitch} className='text-red-400 hover:text-red-300 transition-colors duration-200'>
                                Sign in
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}