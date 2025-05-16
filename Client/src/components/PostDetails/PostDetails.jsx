import React, { useEffect } from "react";
import Spinner from "../../img/Spinner-1s-200px.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../actions/posts";
import "./PostDetails.css";
// import userLogo from "../../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";

const PostDetails = () => {
    const { post, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClose = () => {
        navigate(-1);
    };

    useEffect(() => {
        dispatch(getPost(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!post)
        return (
            <div className="postdetails">
                <div className="post-close-btn" onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </div>
                <div className="postdetails-container">
                    <div className="loading">
                        <img src={Spinner} alt="loading-spinner" />
                        <p className="loading-text">
                            Please wait... This app is built using a free server
                            resulting in increased loading times.
                        </p>
                    </div>
                </div>
            </div>
        );

    if (isLoading) {
        return (
            <div className="postdetails">
                <div className="post-close-btn" onClick={handleClose}>
                    <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
                </div>
                <div className="postdetails-container">
                    <div className="loading">
                        <img src={Spinner} alt="loading-spinner" />
                        <p className="loading-text">
                            Please wait... This app is built using a free server
                            resulting in increased loading times.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="postdetails">
            <div className="postdetails-container">
                <div className="post-close-btn" onClick={handleClose}>
                    <FontAwesomeIcon
                        icon={faClose}
                        className="post-close-icon"
                    ></FontAwesomeIcon>
                </div>
                <div className="post-img-container">
                    <img src={post.selectedFile} alt="post_image" />
                </div>
                <div className="post-details-container">
                    <div className="post-user-detail">
                        {/* <img src={userLogo} alt="" /> */}
                        <div className="user-name">{post.name}</div>
                    </div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-caption">{post.caption}</div>
                    <div className="post-time">
                        {moment(post.createdAt).fromNow()}
                    </div>
                    <Comments post={post} />
                </div>
            </div>
        </div>
    );
};

export default PostDetails;
