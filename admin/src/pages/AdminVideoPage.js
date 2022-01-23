import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminVideo from '../components/adminVideo/AdminVideo'
import SideBar from '../components/sideBar/SideBar'
import { userSelector } from '../store/reducers/users/UserSlice'

export default function AdminVideoPage() {
    const userInfo = useSelector(userSelector)

    const navigate = useNavigate()
    if (!userInfo?.isAdmin) {
        navigate('/login')

    }
    return (
        <div>
            <div >
                <SideBar />
                <AdminVideo />
            </div>
        </div>
    )
}
