import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getVideobyId, videosSelectorId } from '../../store/reducers/video/VideoSlice';
import './ChapterVideo.scss';
import ListVideoChapter from './ListVideoChapter';

export default function ChapterVideo() {
    const { id } = useParams()
    // console.log(id)
    const videoId = useSelector(videosSelectorId)
    // console.log(videoId)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideobyId(id))
    }, [id])
    return (
        <div className="admin-video">
            <div className="admin-video-link">
                <Link to={'/addchapter/' + videoId?._id} className="add-video">
                    <PlusOutlined />
                </Link>

            </div>

            {videoId ? (
                <ListVideoChapter listvideos={videoId}></ListVideoChapter>
            ) : (
                "Loading"
            )}
        </div>
    )
}
