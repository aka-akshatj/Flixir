import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSmile } from "@fortawesome/free-solid-svg-icons";
import { commentPost } from "../../actions/posts";
import Loading from "../../img/cmt-loading.svg";

const Comments = ({ post }) => {
  const dispatch = useDispatch();
  const { cmtLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comments, setComments] = useState(post?.comments || []);
  const [comment, setComment] = useState("");

  const handleClick = async () => {
    if (!comment.trim()) return;
    const finalComment = `${
      user.result.name || user.result.username
    }: ${comment}`;
    const newComments = await dispatch(commentPost(finalComment, post._id));
    setComment("");
    setComments(newComments);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Comments Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h3
          className="text-lg font-semibold text-white"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comments List */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {comments.length > 0 ? (
          comments.map((com, i) => {
            const [username, ...messageParts] = com.split(": ");
            const message = messageParts.join(": ");

            return (
              <div key={i} className="flex gap-3 group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
                  {username?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-white text-sm">
                      {username}
                    </span>
                    <span className="text-xs text-slate-500">now</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed break-words">
                    {message}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faSmile}
                className="text-2xl text-slate-400"
              />
            </div>
            <p className="text-slate-400 text-sm">No comments yet</p>
            <p className="text-slate-500 text-xs mt-1">
              Be the first to share your thoughts!
            </p>
          </div>
        )}
      </div>

      {/* Comment Input */}
      {user?.result?.name ? (
        <div className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs flex-shrink-0">
              {user.result.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-150"
                disabled={cmtLoading}
              />
              <button
                onClick={handleClick}
                disabled={!comment.trim() || cmtLoading}
                className={`p-2 rounded-full transition-colors duration-150 ${
                  comment.trim() && !cmtLoading
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                    : "bg-white/10 text-slate-400 cursor-not-allowed"
                }`}
              >
                {cmtLoading ? (
                  <img src={Loading} alt="loading" className="w-4 h-4" />
                ) : (
                  <FontAwesomeIcon icon={faPaperPlane} className="text-sm" />
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 border-t border-white/10 text-center">
          <p className="text-slate-400 text-sm">
            <a
              href="/auth"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-150"
            >
              Sign in
            </a>{" "}
            to join the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default Comments;
