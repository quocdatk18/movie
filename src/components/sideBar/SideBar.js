import {
    ShopOutlined, UsergroupAddOutlined, LogoutOutlined, SettingOutlined
} from "@ant-design/icons";
import React from 'react';
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from 'react-router-dom';
import { Logout } from "../../store/reducers/users/UserSlice";
import './SideBar.scss'
export default function SideBar() {
    const { pathname } = useLocation()
    // console.log(pathname)
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(Logout())
    }
    return (
        <div className='sidebar'>
            <div className="sidebar--logo">
                <img src="https://raw.githubusercontent.com/trananhtuat/tua-react-admin/main/src/assets/images/logo.png"></img>
            </div>
            <div className="sidebar--list">
                <Link to="/customer" className={` sidebar-list-item ${pathname === '/customer' ? 'active' : ''}`}>
                    <span className="slidebar-list-icon">
                        <UsergroupAddOutlined />
                    </span>
                    <p>Customer</p>
                </Link>
                <Link to="/videos" className={` sidebar-list-item ${pathname === '/videos' ? 'active' : ''}`}>
                    <span className="slidebar-list-icon">
                        <ShopOutlined />
                    </span>
                    <p>All Video</p>
                </Link>
                <Link to="/#" className={` sidebar-list-item ${pathname == "avc" ? 'active' : ''}`}>
                    <span className="slidebar-list-icon">
                        <ShopOutlined />
                    </span>
                    <p>Support</p>
                </Link>
                <Link to="/#" className={` sidebar-list-item ${pathname === 'acb' ? 'active' : ''}`}>
                    <span className="slidebar-list-icon">
                        <SettingOutlined />
                    </span>
                    <p>Settings</p>
                </Link>
                <Link onClick={logout} to="" className='sidebar-list-item'>
                    <span className="slidebar-list-icon">
                        <LogoutOutlined />
                    </span>
                    <p>Logout</p>
                </Link>
            </div>
        </div >
    )
}
