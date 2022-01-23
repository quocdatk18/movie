import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AdminAddChapter from '../components/adminCreate/AdminAddChapter'
import AdminUpdateChapter from '../components/adminCreate/AdminUpdateChapter'
import SideBar from '../components/sideBar/SideBar'
import { userSelector } from '../store/reducers/users/UserSlice'

export default function AdminUpdateChapterPage() {
    const userInfo = useSelector(userSelector)

    const navigate = useNavigate()
    if (!userInfo?.isAdmin) {
        navigate('/login')

    }
    return (
        <div >
            <SideBar />
            <AdminUpdateChapter />
        </div>
    )
}
