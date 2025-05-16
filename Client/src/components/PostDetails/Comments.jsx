import React, { useState } from "react";
import "./PostDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { commentPost } from "../../actions/posts";
import Loading from "../../img/cmt-loading.svg";

const Comments = ({ post }) => {
    const dispatch = useDispatch();
    const { cmtLoading } = useSelector((state) => state.posts);
    const user = JSON.parse(localStorage.getItem("profile"));
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState("");
    const handleClick = async () => {
        const finalComment = `${user.result.username}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComment("");
        setComments(newComments);
    };
    // console.log(cmtLoading);
    return (
        <div className="comments">
            <div className="comments-header">Comments</div>
            {user?.result?.name && (
                <div className="write-comment">
                    <input
                        className="write-comment-input"
                        type="text"
                        placeholder="Write a comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="cmt-submit-btn"
                        disabled={!comment || cmtLoading}
                        onClick={handleClick}
                    >
                        {cmtLoading ? (
                            <img
                                src={Loading}
                                alt="comment loading"
                                className="cmt-loading-img"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faPaperPlane} />
                        )}
                    </button>
                </div>
            )}
            {/* <div className="divider"></div> */}
            {cmtLoading && (
                <p className="loading-text">
                    Please wait... Loading Soon.
                </p>
            )}
            <div className="comments-container">
                {comments.map((com, i) => (
                    <div className="comment" key={i}>
                        <div className="comment-username">
                            {com.split(": ")[0]}:{" "}
                        </div>
                        &nbsp;
                        <div className="comment-text"> {com.split(":")[1]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;
