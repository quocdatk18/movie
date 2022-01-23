import { DeleteOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch } from 'react-redux';
import { deletelUsers, getAllUsers } from '../../store/reducers/users/UserSlice';
import './ListUser.scss';



function ListUser(props) {
    const { users } = props;
    const dispatch = useDispatch()

    const handleDeleteUser = async (user) => {
        if (window.confirm('Bạn có chắc muốn xóa thành viên ?') === true) {
            await dispatch(deletelUsers(user._id))
            dispatch(getAllUsers())
        } else {
            window.location.reload()
        }

    }

    return (
        <div className="admin-user-list">
            <table>
                <tbody>
                    <tr className='admin__user-header'>
                        <th></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Phone</th>
                        <th></th>
                    </tr>
                    {
                        users?.map((user, index) => (
                            <tr key={index} className='admin__user-body'>
                                <td className='admin__user-id'>{index + 1}</td>
                                <td className='admin__user-name'>{user.name}</td>
                                <td className='admin__user-email'>{user.email}</td>
                                <td className='admin__user-address'>{user.address}</td>
                                <td className='admin__user-phone'>{user.phone}</td>
                                <td className="admin__user-delete" onClick={() => handleDeleteUser(user)}><DeleteOutlined className='admin__user-icon' /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default ListUser;