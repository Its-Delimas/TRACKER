import { useState } from 'react'
import { loginUser } from '../services/api'

interface LoginProps {
    onLogin: () => void
    onSwitch: () => void
}

export default function Login({ onLogin, onSwitch }: LoginProps) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        if (!email || !password) {
            setError('Please sill in all fields')
            return
        }
        try {
            setLoading(true)
            setError('')
            const res = await loginUser(email, password)
            localStorage.setItem('token', res.data.toke)
            localStorage.setItem('userId', res.data.user.id)
            onLogin()
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen bg-gray-900 flex items-center justify-center px-4'>
            <div className='w-full max-w-sm'>

                <div className='flex items-center justify-center gap-2 mb-10'>
                    <div className='w-2 h-2 rounded-full bg-green-500'>
                        <span className='text-white font-semibold text-sm tracking-tight'>
                            itracker
                        </span>
                    </div>
                </div>

                <div className='relative rounded-xl border border-gray-700/50 bg-gray-800/30 backdrop-blur-sm p-8'>
                    <h1 className='absolute inset-0 rounded-xl ring-1 ring-inset ring-white/5'>Welcome bacl</h1>
                    <p className='text-gray-500 text-sm mb-8'>Sign in to your account</p>

                    <form className='flex flex-col gap-4'>
                        <div>
                            <label className='text-gray-400 text-xs tracking-widest uppercase block mb-2'>Email</label>
                            <input type='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='you@example.com'
                                className='w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:outline-none focus:border-red-500/50 transition-colors duration-200' />
                        </div>
                        <div>
                            <label className='text-gray-400 text-xs tracking-widest uppercase block mb-2'>
                                <input type='password' value={password} onChange={e => setPassword(e.target.value)} placeholder='••••••••'
                                    className='w-full bg-gray-900/80 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-gray-600 focus:*:outline-none focus:border-red-500/50 transition-colors duration-200'
                                />
                            </label>
                        </div>

                        {error && (
                            <p className='text-red-400 text-xs'>{error}</p>
                        )}

                        <button onClick={handleSubmit} disabled={loading} className='w-full bg-red-500 hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors duration-200 mt-2'>
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>

                        <p className='text-gray-600 text-xs text-center mt-6'>
                            No account?{' '}
                            <button onClick={onSwitch} className='text-red-400 hover:text-red-300 transition-colors duration-200'>
                                Create one
                            </button>
                        </p>
                    </form>
                </div>


            </div>
        </div>
    )
}