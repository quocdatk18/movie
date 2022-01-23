
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoading } from '../../store/reducers/global/loading';
import { LoginAcc, userSelector } from '../../store/reducers/users/UserSlice';
// import { LoginAcc } from '../../store/reducers/users/UserSlice';
import './Login.css';

export default function Login() {
    const dispatch = useDispatch()
    const userInfo = useSelector(userSelector)
    const navigate = useNavigate()
    if (userInfo?.isAdmin) {
        navigate('/customer')
    } else {
        navigate('/login')


    }

    const {
        register,
        handleSubmit,
    } = useForm();
    // const navigate = useNavigate();
    const onSubmit = async (data, e) => {
        e.preventDefault();
        dispatch(setLoading(true))

        await dispatch(LoginAcc(data));
        console.log(data)
        dispatch(setLoading(false))

    };


    return (
        <div className="body">
            <div className="login">
                <h2> Chào mừng tới với trang quản trị viên</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="form-login">

                    <input {...register("email")} placeholder="vui lòng nhập email" type="email" required></input>


                    <input
                        {...register("password")}

                        type="password"
                        required
                        placeholder="vui lòng nhập password"
                    ></input>

                    <input type="submit" value="Đăng Nhập"></input>
                </form>
            </div>
        </div>
    )
}
