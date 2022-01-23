import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { chapteupdate, deleteChapter, deleteComment, getVideobyId, videosSelectorId } from '../../store/reducers/video/VideoSlice';
import './ListVideo.scss';


function ListVideoChapter({ listvideos }) {
    // console.log(listvideos)
    const dispatch = useDispatch()
    // console.log(listvideos)
    const { id } = useParams()
    const videoId = useSelector(videosSelectorId)
    // console.log(videoId)
    const handleDeletechapter = async (item) => {
        if (window.confirm('Đồng ý xóa video này ?') === true) {

            await dispatch(deleteChapter({ item, id }))
        } else {

        }
    };

    useEffect(() => {
        dispatch(getVideobyId(id))
    }, [id, dispatch])
    const deleteCmt = async (e, item) => {
        e.preventDefault()
        if (window.confirm('Đồng ý xóa comment này ?') === true) {
            const _id = videoId._id
            await dispatch(deleteComment({ item, _id }))
        } else {

        }
    }
    const updatechapter = (e, item) => {
        dispatch(chapteupdate(item))
    }
    return (
        <div className="admin-video-list">
            <table>
                <thead>
                    <tr className="admin__video-header">
                        <th>No.</th>
                        <th>Name</th>
                        <th>NameFirm</th>
                        <th>Link Video</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {listvideos ? listvideos?.list?.map((item, index) => {
                        return <tr key={index} className="admin__video-body">
                            <td className="video__list-id">{index + 1}</td>

                            <td className="video__list-name">
                                <p>
                                    {item?.name}
                                </p>
                            </td>
                            <td className="video__list-description">
                                <p>
                                    {item?.nameFirm}
                                </p>
                            </td>
                            <td className="video__list-type">{item?.video}
                            </td>
                            <td
                                className="video__list-delete"
                                onClick={(e) => handleDeletechapter(item)}
                            >
                                <DeleteOutlined className="video__list-icon" />
                            </td>
                            <td className="video__list-update">
                                <Link onClick={(e) => updatechapter(e, item)} to={`/updatechapter/${listvideos._id}`}>
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
            <div className="showcmt">
                <div className="title">
                    <h1>Bình luận Video</h1>
                </div>
                <div className="table">
                    <table>
                        <thead>
                            <tr className="admin__video-header">
                                <th>No.</th>
                                <th>name</th>
                                <th>bình luận</th>
                                <th>Id thành viên</th>

                            </tr>
                        </thead>
                        <tbody>
                            {listvideos.comments?.length > 0 ? listvideos?.comments?.map((item, index) => {
                                return <tr key={index} className="admin__video-body">
                                    <td className="video__list-id">{index + 1}</td>

                                    <td className="video__list-name">
                                        <p>
                                            {item.author}
                                        </p>
                                    </td>
                                    <td className="video__list-description">
                                        <p>
                                            {item.content}
                                        </p>
                                    </td>
                                    <td className="video__list-type">{item.byUser}
                                    </td>
                                    <td
                                        className="video__list-delete"
                                        onClick={(e) => deleteCmt(e, item)}
                                    >
                                        <DeleteOutlined className="video__list-icon" />
                                    </td>


                                </tr>
                            }) :
                                <tr>
                                    <td>
                                        loading........
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div >
    );
}

export default ListVideoChapter;