import React, { useEffect, useState } from "react";
import Spinner from "../../img/Spinner-1s-200px.svg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, likePost } from "../../actions/posts";
import UserLogo from "../../img/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faHeart,
  faComment,
  faBookmark,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import Comments from "./Comments";

const PostDetails = () => {
  const { post, isLoading } = useSelector((state) => state.posts);
  const [showComments, setShowComments] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClose = () => {
    navigate(-1);
  };

  const handleLike = () => {
    if (user?.result?.name) {
      dispatch(likePost(post._id));
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = post.selectedFile;
    link.download = `${post.title}.jpg`;
    link.click();
  };

  const likes = post?.likes || [];
  const isLiked = likes.find(
    (like) => like === (user?.result?.googleId || user?.result?._id)
  );

  useEffect(() => {
    dispatch(getPost(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!post || isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors duration-150"
        >
          <FontAwesomeIcon icon={faClose} className="text-xl" />
        </button>

        {/* Loading Content */}
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <img src={Spinner} alt="loading-spinner" className="w-6 h-6" />
          </div>
          <h3
            className="text-lg font-semibold text-white mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Loading Post
          </h3>
          <p className="text-slate-400 text-sm max-w-md">Fetching content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4">
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors duration-150"
      >
        <FontAwesomeIcon icon={faClose} className="text-xl" />
      </button>

      {/* Main Modal Container */}
      <div className="w-full max-w-6xl h-full max-h-[85vh] flex flex-col lg:flex-row rounded-2xl overflow-hidden glass-effect border border-white/10 shadow-xl">
        {/* Image Section */}
        <div className="flex-1 relative bg-black/20 flex items-center justify-center">
          <img
            src={post.selectedFile}
            alt={post.title}
            className={`max-w-full max-h-full object-contain transition-opacity duration-150 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Image Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <img src={Spinner} alt="loading" className="w-6 h-6" />
              </div>
            </div>
          )}

          {/* Image Overlay Actions */}
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors duration-150"
              title="Download Image"
            >
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full lg:w-96 xl:w-[28rem] flex flex-col bg-gradient-to-b from-slate-900/95 to-slate-800/95 backdrop-blur-xl">
          {/* Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                {post.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
              <div>
                <h3
                  className="font-semibold text-white text-base"
                  style={{ fontFamily: "Poppins, sans-serif" }}
                >
                  {post.name}
                </h3>
                <p className="text-slate-400 text-sm">
                  {moment(post.createdAt).fromNow()}
                </p>
              </div>
            </div>

            {/* Post Title & Caption */}
            <div className="space-y-3">
              <h1
                className="text-xl font-bold text-white leading-tight"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                {post.title}
              </h1>
              {post.caption && (
                <p className="text-slate-300 text-sm leading-relaxed">
                  {post.caption}
                </p>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-500/30"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Interaction Bar */}
          <div className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                {/* Like Button */}
                {user?.result?.name ? (
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors duration-150 ${
                      isLiked
                        ? "text-red-500"
                        : "text-slate-400 hover:text-red-500"
                    }`}
                  >
                    <FontAwesomeIcon icon={faHeart} className="text-lg" />
                    <span className="font-medium">{likes.length}</span>
                  </button>
                ) : (
                  <button className="flex items-center gap-2 text-slate-400 cursor-not-allowed opacity-50">
                    <FontAwesomeIcon icon={faHeart} className="text-lg" />
                    <span className="font-medium">{likes.length}</span>
                  </button>
                )}

                {/* Comment Toggle */}
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`flex items-center gap-2 transition-colors duration-150 ${
                    showComments
                      ? "text-blue-500"
                      : "text-slate-400 hover:text-blue-500"
                  }`}
                >
                  <FontAwesomeIcon icon={faComment} className="text-lg" />
                  <span className="font-medium">
                    {post.comments?.length || 0}
                  </span>
                </button>
              </div>

              {/* Save Button */}
              <button className="text-slate-400 hover:text-yellow-500 transition-colors duration-150">
                <FontAwesomeIcon icon={faBookmark} className="text-lg" />
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-hidden">
            {showComments && <Comments post={post} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
