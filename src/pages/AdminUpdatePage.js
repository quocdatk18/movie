import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminUpdate from '../components/adminCreate/AdminUpdate'
import SideBar from '../components/sideBar/SideBar'
import { userSelector } from '../store/reducers/users/UserSlice'

export default function AdminUpdatePage() {
    const userInfo = useSelector(userSelector)

    const navigate = useNavigate()
    if (!userInfo?.isAdmin) {
        navigate('/login')

    }
    return (
        <div >
            <SideBar />
            <AdminUpdate />
        </div>
    )
}
