import React, { useEffect, useRef, useState } from 'react';
import './AdminCreate.scss';
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { editCurrentPage, saveVideo, videosSelector } from '../../store/reducers/video/VideoSlice';
import { useNavigate } from 'react-router-dom';




const styles = {
    container: {
        marginTop: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    textareaDefaultStyle: {
        padding: 5,

        display: "block",
        resize: "none",
        // backgroundColor: "#eee",
    },
};

export default function AdminCreate() {
    const { register, handleSubmit } = useForm();
    const videos = useSelector(videosSelector);
    const { pages } = videos
    const [value, setValue] = useState('')
    const [image, setImage] = useState("");

    const handleFileImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const dispatch = useDispatch();

    const textareaRef = useRef()
    const textAreaChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (textareaRef && textareaRef.current) {
            textareaRef.current.style.height = "0px";
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = scrollHeight + "px";
        }
    }, [value]);
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        let formData = new FormData();
        formData.append("image", image);
        formData.append("name", data.name);
        formData.append("description", value);
        formData.append("type", data.type);
        await dispatch(saveVideo(formData));
        await dispatch(editCurrentPage(pages));
        navigate('/videos')
    };

    return (
        <div className='admincreate'>
            <div className="admincreate--div">
                <div className="admincreate-title">
                    <h1>Create Video</h1>
                </div>
                <div className="admin-form">
                    <form onSubmit={handleSubmit(onSubmit)}
                        encType="multipart/form-data">
                        <div className="form-div">
                            <label htmlFor="name">Movie Tittle :</label>
                            <input  {...register("name")} type="text" placeholder='Movie name ...' />
                        </div>
                        <div className="form-div">
                            <label htmlFor="description">Movie Description :</label>
                            <textarea
                                ref={textareaRef}
                                style={styles.textareaDefaultStyle}
                                onChange={textAreaChange}
                                value={value}
                                required
                                placeholder='Movie description ...'
                            >
                                {value}
                            </textarea>
                        </div>
                        <div className="form-div">
                            <label htmlFor="type">Movie Type :</label>
                            <select  {...register("type")}>
                                <option>2D</option>
                                <option>3D</option>
                                <option>Anime</option>
                                <option>Movie</option>
                            </select>
                        </div>
                        <div className='label-file'>
                            <label htmlFor="image">Movie Image </label>
                            <input type="file"
                                {...register("image")}
                                onChange={handleFileImageChange}
                            />
                        </div>
                        <div className="form-div">
                            <button type='submit'>Add Movie</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
