import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Login from '../components/login/Login'
import { userSelector } from '../store/reducers/users/UserSlice'

export default function AdminLoginPage() {
    const userInfo = useSelector(userSelector)
    const navigate = useNavigate()
    if (userInfo?.isAdmin) {
        navigate('/customer')
    } else {

        navigate('/login')


    }

    return (
        <div>
            <Login />
        </div>
    )
}
