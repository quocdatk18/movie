import React from 'react'
import { useSelector } from 'react-redux'
import AdminUser from '../components/adminUser/AdminUser'
import SideBar from '../components/sideBar/SideBar'
import { userSelector } from '../store/reducers/users/UserSlice'
import { useNavigate } from 'react-router-dom';

export default function AdminUserPage() {
    const userInfo = useSelector(userSelector)
    console.log(userInfo)

    const navigate = useNavigate()
    if (userInfo && userInfo?.isAdmin) {

    } else {
        navigate('/login')
    }
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <SideBar />
            <AdminUser />
        </div>
    )
}
