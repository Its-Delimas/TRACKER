import axios from 'axios'

const api = axios.create({
    baseURL:'http://localhost:5000/api',
    headers:{
        'Content-Type':'application/json'
    }
})

// attach token to very request automatically
api.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const registerUser = (email:string, password:string)=>
    api.post('/auth/register',{email,password})

export const loginUser = (email:string, password: string)=>
    api.post('/auth/login',{email,password})


export const saveSessions = (duration: number)=>
    api.post('sessions',{duration})

export const fetchSessions = () =>
    api.get('/sessions')

export const fetchTodaySessions = () =>
    api.get('/sessions/today')

export default api