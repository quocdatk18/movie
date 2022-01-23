import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosHeroku } from "../../../config";
export const getAllVideo = createAsyncThunk('ok', async () => {
    const { data } = await axiosHeroku.get('/video')
    return data
})
export const getVideobyId = createAsyncThunk('okvideo', async (id) => {
    const { data } = await axiosHeroku.get(`/video/detail/${id}`)
    return data
})
export const getVideobyType = createAsyncThunk('okvideotype', async (type) => {

    const { data } = await axiosHeroku.get(`/video/${type}`)
    return data
})
export const updateViews = createAsyncThunk('okviewsupdate', async (id) => {
    console.log(id)
    const { data } = await axiosHeroku.put(`/video/updateview/video/${id}`)
    return data
})
export const getVideoChapter = createAsyncThunk('okvideochapter', async (list) => {
    const { id, chapter } = list
    const { data } = await axiosHeroku.get(`/video/videoId/${id}/${chapter}`)
    return data
})

export const searchVideo = createAsyncThunk('okname', async (name) => {

    try {
        const { data } = await axiosHeroku.get(
            `/video/search/video?name=${name}`
        );
        return data
    } catch (error) {
        return {}
    }
});
export const commentVideo = createAsyncThunk('okComment', async (list, { dispatch, getState }) => {
    try {
        const { comment, id } = list
        const { userInfo } = getState().userReducer

        const { data } = await axiosHeroku.post(
            `/video/comment/${id}`,
            comment, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        );
        return data
    } catch (error) {
        console.log(error)
    }
});
export const repCommentVideo = createAsyncThunk('okrepComment', async (list, { dispatch, getState }) => {
    try {
        const { comment, id } = list
        const { userInfo } = getState().userReducer

        const { data } = await axiosHeroku.post(
            `/video/rep/comment/${id}`,
            comment, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        );
        return data
    } catch (error) {
        console.log(error)
    }
});

export const deleteComment = createAsyncThunk('deletecmtUsers/deletecmtUsersFetched', async (items, { dispatch, getState
}) => {

    try {
        const { userInfo } = getState().userReducer
        const { data } = await axiosHeroku.patch(
            `/video/deletecmt/`, items, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        )
        return (
            data

        )
    } catch (error) {
        return null
    }
});
export const deleteRepComment = createAsyncThunk('deleterepcmtUsers/deleterepcmtUsersFetched', async (items, { dispatch, getState
}) => {

    try {
        // console.log(items)

        const { userInfo } = getState().userReducer
        const { data } = await axiosHeroku.patch(
            `/video/deleterepcmt/`, items, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        )
        return (
            data

        )
    } catch (error) {
        return null
    }
});
const videosSlice = createSlice({
    name: 'video',
    initialState: {
        allVideo: {},
        allVideoSearch: [],
        videoId: {},
        videoType: {

        },
        Key: {},
        videoList: [],
        videoChapter: []

    },
    reducers: {
        filterVideoKey(state, action) {
            return {
                ...state,
                Key: action.payload
            }
        },
        videoListget(state, action) {
            return console.log(action.payload)
        }
    },

    extraReducers: {
        [getAllVideo.fulfilled]: (state, action) => {

            state.allVideo = action.payload
        },
        [getVideobyId.fulfilled]: (state, action) => {
            state.videoId = action.payload
        },
        [getVideobyType.fulfilled]: (state, action) => {
            state.videoType = action.payload
        },
        [searchVideo.fulfilled]: (state, action) => {
            state.allVideoSearch = action.payload
        },
        [getVideoChapter.fulfilled]: (state, action) => {
            state.videoChapter = action.payload
        },
        [commentVideo.fulfilled]: (state, action) => {
            state.videoId = action.payload
        },
        [repCommentVideo.fulfilled]: (state, action) => {
            state.videoId = action.payload
        }, [deleteComment.fulfilled]: (state, action) => {
            state.videoId = action.payload

        }, [deleteRepComment.fulfilled]: (state, action) => {
            state.videoId = action.payload
        }

    },
})
//reducer
const videosReducer = videosSlice.reducer

// Selector
export const videosSelector = state => state.videoReducer.allVideo
export const videosSelectorId = state => state.videoReducer.videoId
export const videosSelectorType = state => state.videoReducer.videoType
export const videosSelectorSearch = state => state.videoReducer.allVideoSearch



// Action export
export const {
    filterVideoKey,
    videoListget
} = videosSlice.actions
export default videosReducer;