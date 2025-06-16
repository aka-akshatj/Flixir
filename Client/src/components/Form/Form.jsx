import React, { useEffect, useState } from "react";
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
      <div
        className="fixed inset-0 flex justify-center items-center z-50 p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        onClick={handleClose}
      >
        <div
          className="w-full max-w-md glass-effect rounded-2xl p-6 md:p-8 border border-white/10 transform transition-all duration-300 scale-100"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: "rgba(30, 30, 46, 0.9)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-xl font-semibold text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Authentication Required
            </h2>
            <button
              className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors duration-300"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faClose} className="text-lg" />
            </button>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                Please sign in to your account to create and share your amazing
                content with the FliXiR community.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="w-full px-4 py-3 text-white font-medium rounded-xl transition-all duration-300 hover:transform hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
              }}
            >
              Go to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 p-4"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-lg glass-effect rounded-2xl p-6 md:p-8 border border-white/10 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "rgba(30, 30, 46, 0.9)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-xl md:text-2xl font-semibold text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            {currentID ? "Edit your Flix" : "Create your Flix"}
          </h2>
          <button
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors duration-300"
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faClose} className="text-lg" />
          </button>
        </div>
        {/* Form */}
        <form
          autoComplete="off"
          noValidate
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Title Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Give your post a catchy title..."
              className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
              }}
              value={postData.title}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  title: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Caption Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Caption
            </label>
            <textarea
              placeholder="Share your thoughts about this moment..."
              className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none resize-none placeholder-slate-400"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
              }}
              rows={4}
              value={postData.caption}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  caption: e.target.value,
                })
              }
            />
          </div>
          {/* File Upload Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Upload Image <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <div className="w-full p-4 border-2 border-dashed border-white/20 rounded-xl transition-all duration-300 hover:border-indigo-500/50 hover:bg-white/5">
                <div className="text-center">
                  {postData.selectedFile ? (
                    <div className="space-y-3">
                      <div className="w-20 h-20 mx-auto rounded-lg overflow-hidden">
                        <img
                          src={postData.selectedFile}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-sm text-green-400">
                        Image uploaded successfully!
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          setPostData({ ...postData, selectedFile: "" })
                        }
                        className="text-xs text-slate-400 hover:text-white underline"
                      >
                        Change image
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-indigo-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <p className="text-sm text-slate-400">
                        Click to upload an image
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({
                      ...postData,
                      selectedFile: base64,
                    })
                  }
                />
              </div>
            </div>
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Tags
            </label>
            <input
              type="text"
              placeholder="photography, nature, travel (comma-separated)"
              className="w-full px-4 py-3 border border-white/20 rounded-xl text-white text-sm transition-all duration-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none placeholder-slate-400"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                backdropFilter: "blur(10px)",
              }}
              value={postData.tags}
              onChange={(e) =>
                setPostData({
                  ...postData,
                  tags: e.target.value.split(","),
                })
              }
            />
            <p className="text-xs text-slate-500">
              Add relevant tags to help others discover your content
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 text-slate-300 font-medium rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 text-white font-semibold rounded-xl transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/25"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
                boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
              }}
            >
              {currentID ? "Update Flix" : "Share Flix"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
