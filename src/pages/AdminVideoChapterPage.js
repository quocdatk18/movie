import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import SideBar from '../components/sideBar/SideBar'
import { userSelector } from '../store/reducers/users/UserSlice';
import ChapterVideo from '../components/adminVideo/ChapterVideo';

export default function AdminVideoChapterPage() {
    const userInfo = useSelector(userSelector)

    const navigate = useNavigate()
    if (!userInfo?.isAdmin) {
        navigate('/login')

    }
    return (
        <div>
            <div >
                <SideBar />
                <ChapterVideo />
            </div>
        </div>
    )
}
