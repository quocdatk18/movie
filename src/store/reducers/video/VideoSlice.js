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
export const paginationVideo = createAsyncThunk('okpagi', async (page) => {
    const { data } = await axiosHeroku.get(`/video/pagination/${page}`)
    return data
})
export const editCurrentPage = createAsyncThunk('okeditpagi', async (page) => {
    // console.log(page)
    return page
})
export const deleteVideo = createAsyncThunk('okedelete', async (videoId, { dispatch, getState }) => {
    try {
        // console.log(videoId)
        const { userInfo } = getState().UserReducer

        const { data } = await axiosHeroku.delete(
            `/video/delete/${videoId}`,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        return data
    } catch (error) {
        // console.log(error)
    }
})
export const deleteChapter = createAsyncThunk('okedeletechaptersss', async (videos, { dispatch, getState }) => {
    try {
        const { id, item } = videos
        console.log(item)
        const { userInfo } = getState().UserReducer
        const { data } = await axiosHeroku.patch(
            `/video/deleteChapter/${id}`, item,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                }
            }
        );
        return data
    } catch (error) {

    }
})
export const deleteComment = createAsyncThunk('deletecmtUsers/deletecmtUsersFetched', async (items, { dispatch, getState
}) => {

    try {
        console.log(items)
        const { userInfo } = getState().UserReducer

        const { data } = await axiosHeroku.patch(
            `/video/deletecmtAdmin/`, items, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        )
        return (
            data

        )
    } catch (error) {
        return console.log(error)
    }
});
export const saveVideo = createAsyncThunk('okesave', async (video, { dispatch, getState }) => {
    try {
        console.log(video)
        const { userInfo } = getState().UserReducer
        console.log(userInfo)
        if (!video.get('_id')) {
            const { data } = await axiosHeroku.post(
                "/video/create",
                video,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            return data
        } else {
            const { data } = await axiosHeroku.put(
                "/video/update",
                video,
                {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            return data
        }
    } catch (error) {
        console.log(error)
    }
})

export const saveChapter = createAsyncThunk('okechapter', async (list, { dispatch, getState }) => {
    try {
        const { id, videochapter } = list
        console.log(videochapter)
        const { userInfo } = getState().UserReducer
        const { data } = await axiosHeroku.post(
            `/video/addchapter/${id}`,
            videochapter,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        return data
    } catch (error) {
        console.log(error)
    }
})

export const updateChapter = createAsyncThunk('okeupdatechapter', async (list, { dispatch, getState }) => {
    try {
        const { id, videochapter } = list
        console.log(videochapter)
        const { userInfo } = getState().UserReducer
        const { data } = await axiosHeroku.put(
            `/video/updatechapter/${id}`,
            videochapter,
            {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        return data
    } catch (error) {
        console.log(error)
    }
})
const videosSlice = createSlice({
    name: 'video',
    initialState: {
        allVideo: [],
        currentPage: 1,
        videoId: {},
        page: null,
        chapter: {}


    },
    reducers: {
        editCurrenPage: (state, action) => {

        },
        chapteupdate: (state, action) => {
            // console.log(action.payload)
            return {
                ...state,
                chapter: action.payload,

            }
        }

    },

    extraReducers: {
        [getAllVideo.fulfilled]: (state, action) => {

            state.allVideo = action.payload
        },
        [paginationVideo.fulfilled]: (state, action) => {
            // console.log(action.payload)
            return { ...state, allVideo: action.payload }
        },
        [editCurrentPage.fulfilled]: (state, action) => {
            // console.log(action.payload)
            return { ...state, currentPage: action.payload }

        },
        [saveVideo.fulfilled]: (state, action) => {
            // console.log(action.payload)
            return { ...state, allVideo: action.payload }

        },
        [deleteVideo.fulfilled]: (state, action) => {
            // console.log(action.payload)
            return { ...state, allVideo: action.payload }

        },
        [deleteChapter.fulfilled]: (state, action) => {
            // console.log(action.payload)
            return { ...state, videoId: action.payload }

        },
        [getVideobyId.fulfilled]: (state, action) => {
            state.videoId = action.payload
        },
        [saveChapter.fulfilled]: (state, action) => {
            state.videoId = action.payload
        },
        [deleteComment.fulfilled]: (state, action) => {
            state.videoId = action.payload
        },



    },
})
//reducer
const videosReducer = videosSlice.reducer

// Selector
export const videosSelector = state => state.VideosReducer.allVideo
export const videosSelectorId = state => state.VideosReducer.videoId




// Action export
export const {
    editCurrenPage,
    chapteupdate
} = videosSlice.actions
export default videosReducer;