import React, { useEffect, useRef, useState } from 'react';
import './AdminCreate.scss';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { editCurrentPage, getVideobyId, saveChapter, saveVideo, updateChapter, videosSelector, videosSelectorId } from '../../store/reducers/video/VideoSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';





export default function AdminUpdateChapter() {
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();
    const videos = useSelector(videosSelector);
    const chapter = useSelector(state => state.VideosReducer.chapter)
    console.log(chapter)
    const { pages } = videos
    const { id } = useParams()
    const videoId = useSelector(videosSelectorId)

    useEffect(() => {
        dispatch(getVideobyId(id))
    }, [id])





    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const videochapter = {
            name: data.namechapter,
            nameFirm: videoId.name,
            video: data.link,
            chapter: data.chapter,
            id: chapter.id


        }

        dispatch(updateChapter({ id, videochapter }))

        navigate('/videos')
    };

    return (
        <div className='admincreate'>
            <div className="admincreate--div">
                <div className="admincreate-title">
                    <h1>Update Chapter Video {videoId?.name} tập {chapter.chapter}</h1>
                </div>
                <div className="admin-form">
                    <form onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data">
                        <div className="form-div">
                            <label htmlFor="namechapter">NameChapter :</label>
                            <input  {...register("namechapter")} type="text" placeholder='Moviechapter name ...' />
                        </div>
                        <div className="form-div">
                            <label htmlFor="chapter">Chapter :</label>
                            <input  {...register("chapter")} value={chapter.chapter} type="number" placeholder='chapter  ...' />
                        </div>
                        <div className="form-div">
                            <label htmlFor="Link">Link Video :</label>
                            <input  {...register("link")} type="text" placeholder='Movie Link ...' />
                        </div>

                        <div className="form-div">
                            <button type='submit'>Update chapter Movie</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
