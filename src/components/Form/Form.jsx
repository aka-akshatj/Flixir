import React, { useEffect, useState } from "react";
import "./Form.css";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../actions/posts";
import { updatePost } from "../../actions/posts";
import { showForm } from "../../actions/form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Form = ({ currentID, setCurrentID }) => {
    const [postData, setPostData] = useState({
        title: "",
        caption: "",
        tags: "",
        selectedFile: "",
    });
    const user = JSON.parse(localStorage.getItem("profile"));
    const dispatch = useDispatch();
    const post = useSelector((state) =>
        currentID ? state.posts.posts.find((p) => p._id === currentID) : null
    );

    useEffect(() => {
        // window.scrollTo(0, 0);
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentID(null);
        setPostData({
            title: "",
            caption: "",
            tags: "",
            selectedFile: "",
        });
    };

    const handleClose = () => {
        dispatch(showForm());
        clear();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentID) {
            dispatch(
                updatePost(currentID, {
                    ...postData,
                    name: user?.result?.username,
                })
            );
            handleClose();
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.username }));
            handleClose();
        }
    };

    if (!user?.result?.name) {
        return (
            <div className="form-body">
                <div className="form-container">
                    <div className="form-header">
                        Please Log In to create your own Polaroid
                        <div className="close-btn" onClick={handleClose}>
                            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="form-body">
            <div className="form-container">
                <div className="form-header">
                    <div className="form-title">
                        {currentID
                            ? "Edit your Polaroid"
                            : "Create your Polaroid"}
                    </div>
                    <div className="close-btn" onClick={handleClose}>
                        <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                    </div>
                </div>
                <form
                    autoComplete="off"
                    noValidate
                    className="form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-input-container">
                        <div className="form-input-label">Title</div>
                        <input
                            type="text"
                            className="form-input-field"
                            value={postData.title}
                            onChange={(e) =>
                                setPostData({
                                    ...postData,
                                    title: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-input-container">
                        <div className="form-input-label">Caption</div>
                        <textarea
                            type="text"
                            className="form-input-field"
                            rows={8}
                            value={postData.caption}
                            onChange={(e) =>
                                setPostData({
                                    ...postData,
                                    caption: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="form-input-container">
                        <div className="form-input-label">
                            Upload your Polaroid
                        </div>
                        <div className="form-upload">
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) =>
                                    setPostData({
                                        ...postData,
                                        selectedFile: base64,
                                    })
                                }
                                className="form-upload-field"
                            ></FileBase>
                        </div>
                    </div>
                    <div className="form-input-container">
                        <div className="form-input-label">Tags</div>
                        <input
                            type="text"
                            className="form-input-field"
                            placeholder="Enter comma-separated words"
                            value={postData.tags}
                            onChange={(e) =>
                                setPostData({
                                    ...postData,
                                    tags: e.target.value.split(","),
                                })
                            }
                        />
                    </div>

                    <button type="submit" className="post-submit-btn">
                        {currentID
                            ? "Update your Polaroid"
                            : "Create your Polaroid"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
