import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../store/reducers/users/UserSlice'
import './AdminUser.scss'
import ListUser from './ListUser'

export default function AdminUser() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.UserReducer.users?.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])
    return (
        <div className='adminuser'>
            <div className="adminuser--div">
                <div className="bodys">
                    <h1>Customer</h1>
                    {users ? (<ListUser users={users}></ListUser>) : (<h2> Loading</h2>)}
                </div>

            </div>
        </div>
    )
}
