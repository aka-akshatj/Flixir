import React, { useState } from "react";
import "./Post.css";
import moment from "moment";
// import userLogo from "../../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBookmark,
    faComment,
    faHeart,
    faPenToSquare,
    faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { showForm } from "../../actions/form";
import { deletePost, likePost } from "../../actions/posts";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentID }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);
    const user = JSON.parse(localStorage.getItem("profile"));

    //Edit button
    const handleEdit = () => {
        setCurrentID(post._id);
        dispatch(showForm());
        // window.scrollTo(0, 0);
    };

    //Delete button
    const handleDelete = () => {
        dispatch(deletePost(post._id));
    };

    //Like Button
    const handleLike = () => {
        dispatch(likePost(post._id));
        if (
            post.likes.find(
                (like) => like === (user?.result?.googleId || user?.result?._id)
            )
        ) {
            setLikes(
                post.likes.filter(
                    (id) => id !== (user?.result.googleId || user?.result?._id)
                )
            );
        } else {
            setLikes([
                ...post.likes,
                user?.result.googleId || user?.result?._id,
            ]);
        }
    };

    //opening the post
    const openPost = () => {
        navigate(`/posts/${post._id}`);
    };

    return (
        <div className="post-container">
            <div className="post-header">
                {/* <div className="userimg">
                    {user?.result?.imageUrl ? (
                        <img
                            src={user.result.imageUrl}
                            alt={user.result.name}
                            className="profile-img"
                        ></img>
                    ) : (
                        <img
                            src={userLogo}
                            alt="guest-logo"
                            className="profile-img"
                        />
                    )}
                </div> */}
                <div className="user-name">{post.name}</div>
                {(user?.result?.googleId === post?.creator ||
                    user?.result?._id === post?.creator) && (
                    <>
                        <button
                            className="edit-btn stat-btn"
                            onClick={handleEdit}
                        >
                            <FontAwesomeIcon
                                icon={faPenToSquare}
                            ></FontAwesomeIcon>
                        </button>
                        <button
                            className="delete-btn stat-btn"
                            onClick={handleDelete}
                        >
                            <FontAwesomeIcon
                                icon={faTrashCan}
                            ></FontAwesomeIcon>
                        </button>
                    </>
                )}
            </div>
            <div className="post-img" onClick={openPost}>
                <img src={post.selectedFile} alt="post-img" />
            </div>
            <div className="post-title-time">
                <div className="post-title">{post.title}</div>
            </div>
            <div className="post-caption">{post.caption}</div>
            <div className="post-time">{moment(post.createdAt).fromNow()}</div>

            <div className="post-stats">
                <div className="post-stat like-stat">
                    {user?.result?.name ? (
                        <button
                            className={
                                likes.find(
                                    (like) =>
                                        like ===
                                        (user?.result?.googleId ||
                                            user?.result?._id)
                                )
                                    ? "stat-btn like-btn"
                                    : "stat-btn"
                            }
                            onClick={handleLike}
                        >
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </button>
                    ) : (
                        <button className="stat-btn" disabled>
                            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon>
                        </button>
                    )}

                    <div className="stat-count like-count">{likes.length}</div>
                </div>
                <div className="post-stat cmt-stat" onClick={openPost}>
                    <button className="stat-btn cmt-btn">
                        <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>
                    </button>
                    <div className="stat-count cmt-count">
                        {post.comments.length}
                    </div>
                </div>
                <div className="post-stat save-stat">
                    <button className="stat-btn save-btn">
                        <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Post;
