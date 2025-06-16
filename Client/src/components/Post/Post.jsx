import React, { useState } from "react";
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
      setLikes([...post.likes, user?.result.googleId || user?.result?._id]);
    }
  };

  //opening the post
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };

  return (
    <div
      className="group relative rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
      style={{
        backgroundColor: "rgba(30, 30, 46, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
      }}
    >
      {/* Post Image - Main Focus */}
      <div className="relative aspect-[4/3] overflow-hidden" onClick={openPost}>
        <img
          src={post.selectedFile}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
        />

        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>

        {/* Action Buttons - Top Right (Owner Only) */}
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors duration-200"
              onClick={handleEdit}
              title="Edit post"
            >
              <FontAwesomeIcon icon={faPenToSquare} className="text-sm" />
            </button>
            <button
              className="p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-red-500/60 transition-colors duration-200"
              onClick={handleDelete}
              title="Delete post"
            >
              <FontAwesomeIcon icon={faTrashCan} className="text-sm" />
            </button>
          </div>
        )}

        {/* Title Overlay - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3
            className="font-semibold text-white text-lg leading-tight mb-1"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {post.title}
          </h3>
          {post.caption && (
            <p className="text-white/80 text-sm line-clamp-2">{post.caption}</p>
          )}
        </div>
      </div>

      {/* Post Footer */}
      <div className="p-4 space-y-3">
        {/* User Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
              {post.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <div
                className="font-medium text-white text-sm"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {post.name}
              </div>
              <div className="text-xs text-slate-400">
                {moment(post.createdAt).fromNow()}
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            {user?.result?.name ? (
              <button
                className={`flex items-center gap-1 transition-colors duration-200 ${
                  likes.find(
                    (like) =>
                      like === (user?.result?.googleId || user?.result?._id)
                  )
                    ? "text-red-500"
                    : "text-slate-400 hover:text-red-500"
                }`}
                onClick={handleLike}
                title={
                  likes.find(
                    (like) =>
                      like === (user?.result?.googleId || user?.result?._id)
                  )
                    ? "Unlike"
                    : "Like"
                }
              >
                <FontAwesomeIcon icon={faHeart} className="text-sm" />
                <span className="text-xs font-medium">{likes.length}</span>
              </button>
            ) : (
              <button
                className="flex items-center gap-1 text-slate-400 cursor-not-allowed opacity-50"
                disabled
                title="Login to like"
              >
                <FontAwesomeIcon icon={faHeart} className="text-sm" />
                <span className="text-xs font-medium">{likes.length}</span>
              </button>
            )}

            {/* Comment Button */}
            <button
              className="flex items-center gap-1 text-slate-400 transition-colors duration-200 hover:text-blue-500"
              onClick={openPost}
              title="View comments"
            >
              <FontAwesomeIcon icon={faComment} className="text-sm" />
              <span className="text-xs font-medium">
                {post.comments.length}
              </span>
            </button>
          </div>

          {/* Save Button */}
          <button
            className="text-slate-400 transition-colors duration-200 hover:text-yellow-500"
            title="Save post"
          >
            <FontAwesomeIcon icon={faBookmark} className="text-sm" />
          </button>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 rounded-full"
              >
                #{tag.trim()}
              </span>
            ))}
            {post.tags.length > 2 && (
              <span className="px-2 py-1 text-xs font-medium bg-slate-500/20 text-slate-400 rounded-full">
                +{post.tags.length - 2}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
