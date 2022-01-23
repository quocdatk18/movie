import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosHeroku } from '../../../config';

export const getAllUsers = createAsyncThunk('users/usersFetched', async () => {
    try {
        const response = await axiosHeroku.get(
            `/user/`
        )
        return response.data
    } catch (error) {
        // console.log(error.message)
    }
});

export const LoginAcc = createAsyncThunk('login/loginFetched', async (user) => {
    // console.log(user)
    try {
        const { data } = await axiosHeroku.post(
            `/user/login`, user
        )
        localStorage.setItem('accessToken', data.token);
        // localStorage.setItem('userInf', data.token);



        return data
    } catch (error) {
        localStorage.removeItem('accessToken');
        return (
            null,
            alert('sai tên đăng nhập hoặc mật khẩu')
        )

    }
});
export const loadUser = createAsyncThunk('user/loadUser', async () => {
    try {
        const token = localStorage.getItem('accessToken')
        if (!token) return null
        const response = await axiosHeroku.get("/user/load-user", {
            headers: {
                "authorization": `Bearer ${token}`
            }
        })
        return response.data.user
    } catch (error) {
        return null
            ;
    }
})
export const deletelUsers = createAsyncThunk('deleteusers/deleteusersFetched', async (userId) => {
    try {
        const response = await axiosHeroku.delete(
            `/user/delete/${userId}`
        )
        return response.data
    } catch (error) {
        console.log(error)
    }
});
const UserSlice = createSlice({
    name: "user",
    initialState: {
        userInfo: localStorage.getItem("acessToken")
            ? JSON.parse(localStorage.getItem("acessToken"))
            : null,
    },
    reducers: {
        Logout: (state, action) => {
            localStorage.removeItem("accessToken")
            return { userInfo: null }
        },
    },
    extraReducers: {
        [LoginAcc.fulfilled]: (state, action) => {
            state.userInfo = action.payload
        }, [getAllUsers.pending]: (state, action) => {
            // console.log('Fetching users from backend ....')
        },
        [getAllUsers.fulfilled]: (state, action) => {
            // console.log(action)
            return {
                ...state,
                users: action.payload,
                error: action.payload
            }
        },
        [getAllUsers.rejected]: (state, action) => {
            // console.log('Failed to get users!!!')
        },
        [loadUser.fulfilled]: (state, action) => {
            return { ...state, userInfo: action.payload };
        },
        [loadUser.rejected]: (state, action) => {
            return { ...state, userInfo: null };
        },
        [deletelUsers.rejected]: (state, action) => {
            return { ...state };
        },
    }
})
const UserReducer = UserSlice.reducer
export const userSelector = state => state.UserReducer.userInfo
export const {
    Logout
} = UserSlice.actions

export default UserReducer
