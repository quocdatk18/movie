import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Pagination } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteVideo, editCurrentPage, paginationVideo } from '../../store/reducers/video/VideoSlice';
import './ListVideo.scss';


function ListVideos({ listvideos }) {
    const dispatch = useDispatch()
    const { videos, pages } = listvideos;

    const currentPage = useSelector(state => state.VideosReducer.currentPage)


    const HandleChangePage = async (number) => {
        await dispatch(paginationVideo(number))
        dispatch(editCurrentPage(number))
    }
    const handleDeleteVideo = async (item) => {
        if (window.confirm('Đồng ý xóa video này ?') === true) {
            await dispatch(deleteVideo(item._id));
            dispatch(paginationVideo(currentPage));
        } else {

        }
    };
    return (
        <div className="admin-video-list">
            <table>
                <thead>
                    <tr className="admin__video-header">
                        <th>No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Type</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {videos ? videos?.map((item, index) => {
                        return <tr key={index} className="admin__video-body">
                            <td className="video__list-id">{index + 1}</td>
                            <td className="video__list-img">
                                <Link to={`/videos/${item._id}`}>
                                    <img src={item.image}></img>
                                </Link>
                            </td>
                            <td className="video__list-name">
                                <p>
                                    {item.name}
                                </p>
                            </td>
                            <td className="video__list-description">
                                <p>
                                    {item.description}
                                </p>
                            </td>
                            <td className="video__list-type">{item.type}
                            </td>
                            <td
                                className="video__list-delete"
                                onClick={(e) => handleDeleteVideo(item)}
                            >
                                <DeleteOutlined className="video__list-icon" />
                            </td>
                            <td className="video__list-update">
                                <Link to={`/update/${item._id}`}>
                                    <EditOutlined className="video__list-icon" />
                                </Link>
                            </td>

                        </tr>
                    }) : <tr>
                        <td>
                            loading........
                        </td>
                    </tr>}
                </tbody>
            </table>

            <div className="pagination">
                <Pagination defaultCurrent={1} current={currentPage} total={90} pageSize={10} onChange={HandleChangePage} />
            </div>

        </div >
    );
}

export default ListVideos;