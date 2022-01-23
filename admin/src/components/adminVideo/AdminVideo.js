import { AppstoreAddOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { paginationVideo, videosSelector } from "../../store/reducers/video/VideoSlice";
import './AdminVideo.scss';
import ListVideos from "./ListVideos";

function AdminVideo(props) {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.VideosReducer.currentPage);
    const videos = useSelector(videosSelector);

    useEffect(() => {
        dispatch(paginationVideo(currentPage));
    }, [dispatch, currentPage]);

    return (
        <div className="admin-video">
            <div className="admin-video-link">
                <Link to="/create" className="add-video">
                    <AppstoreAddOutlined />
                </Link>

            </div>

            {videos ? (
                <ListVideos listvideos={videos}></ListVideos>
            ) : (
                "Loading"
            )}
        </div>
    );
}

export default AdminVideo;
