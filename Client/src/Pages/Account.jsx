import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faCalendarAlt,
  faEdit,
  faCamera,
  faHeart,
  faComment,
  faImage,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import UserLogo from "../img/user.png";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, getUserPosts } from "../actions/posts";
import { updateProfile } from "../actions/users";
import ImageCropModal from "../components/ImageCropModal/ImageCropModal";

const Account = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: "",
    name: "",
    about: "",
    profilePicture: "",
  });
  const [editingPost, setEditingPost] = useState(null);
  const [postEditForm, setPostEditForm] = useState({
    caption: "",
    tags: "",
  });
  const [showImageCropModal, setShowImageCropModal] = useState(false);
  const { posts } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  // Filter user's posts
  const userPosts = posts.filter(
    (post) =>
      post.creator === user?.result?._id ||
      post.creator === user?.result?.googleId
  );

  useEffect(() => {
    if (user?.result) {
      setEditForm({
        username: user.result.username || "",
        name: user.result.name || "",
        about: user.result.about || "",
        profilePicture: user.result.profilePicture || "",
      });
    }
  }, [user]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProfile = async () => {
    try {
      console.log("Saving profile with form data:", {
        ...editForm,
        profilePictureLength: editForm.profilePicture
          ? editForm.profilePicture.length
          : 0,
      });

      const result = await dispatch(updateProfile(editForm));
      console.log("Profile save result:", result);

      if (result) {
        // Update local user state
        const updatedProfile = JSON.parse(localStorage.getItem("profile"));
        setUser(updatedProfile);
        setIsEditing(false);
        console.log("Profile updated successfully, editing mode disabled");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      // You could add error handling here (e.g., show error message)
    }
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setPostEditForm({
      caption: post.caption || "",
      tags: post.tags ? post.tags.join(", ") : "",
    });
  };

  const handleCancelPostEdit = () => {
    setEditingPost(null);
    setPostEditForm({
      caption: "",
      tags: "",
    });
  };

  const handlePostEditChange = (e) => {
    setPostEditForm({
      ...postEditForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSavePost = () => {
    const updatedPost = {
      ...editingPost,
      caption: postEditForm.caption,
      tags: postEditForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    };

    dispatch(updatePost(editingPost._id, updatedPost));
    setEditingPost(null);
    setPostEditForm({
      caption: "",
      tags: "",
    });
  };

  const handleImageCropSave = (croppedImageUrl) => {
    console.log("Saving cropped image:", {
      imageLength: croppedImageUrl ? croppedImageUrl.length : 0,
      imagePreview: croppedImageUrl
        ? croppedImageUrl.substring(0, 50) + "..."
        : "No image",
    });

    setEditForm({
      ...editForm,
      profilePicture: croppedImageUrl,
    });
    setShowImageCropModal(false);

    console.log("Updated edit form with new profile picture");
  };

  const handleImageCropClose = () => {
    setShowImageCropModal(false);
  };

  const handleCameraClick = () => {
    setShowImageCropModal(true);
  };

  // Fetch user posts when component mounts
  useEffect(() => {
    if (user?.result) {
      dispatch(getUserPosts());
    }
  }, [dispatch, user]);

  if (!user?.result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Please sign in to view your account
          </h2>
          <p className="text-slate-400">
            You need to be logged in to access this page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Profile Header */}
        <div className="glass-effect rounded-2xl p-6 md:p-8 border border-white/10 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 group-hover:border-indigo-400 transition-all duration-300">
                {user.result.profilePicture || user.result.imageUrl ? (
                  <img
                    src={user.result.profilePicture || user.result.imageUrl}
                    alt={user.result.name || user.result.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                    {(user.result.name || user.result.username)
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={handleCameraClick}
                  className="absolute bottom-2 right-2 w-10 h-10 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-colors duration-300"
                  title="Change profile picture"
                >
                  <FontAwesomeIcon icon={faCamera} className="text-sm" />
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Username *
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={editForm.username}
                      onChange={handleInputChange}
                      placeholder="Enter username"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleInputChange}
                      placeholder="Enter your display name"
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      About
                    </label>
                    <textarea
                      name="about"
                      value={editForm.about}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                      maxLength={500}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      {editForm.about.length}/500 characters
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Profile Picture
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
                        {editForm.profilePicture ? (
                          <img
                            src={editForm.profilePicture}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                            {(editForm.name || editForm.username)
                              ?.charAt(0)
                              ?.toUpperCase() || "U"}
                          </div>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={handleCameraClick}
                        className="px-4 py-2 bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 rounded-lg transition-colors duration-150 text-sm"
                      >
                        <FontAwesomeIcon icon={faCamera} className="mr-2" />
                        {editForm.profilePicture
                          ? "Change Picture"
                          : "Add Picture"}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-300 font-medium"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleEditToggle}
                      className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <h1
                      className="text-2xl md:text-3xl font-bold text-white"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {user.result.name || user.result.username}
                    </h1>
                    <button
                      onClick={handleEditToggle}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all duration-300"
                      title="Edit Profile"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-sm" />
                    </button>
                  </div>

                  <div className="space-y-2 text-slate-300 mb-4">
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <span className="text-indigo-400">@</span>
                      <span>{user.result.username}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-indigo-400"
                      />
                      <span>{user.result.email}</span>
                    </div>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="text-indigo-400"
                      />
                      <span>
                        Joined{" "}
                        {new Date(
                          user.result.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {user.result.about && (
                    <div className="text-center md:text-left">
                      <p className="text-slate-300 text-sm leading-relaxed bg-white/5 rounded-lg p-3 border border-white/10">
                        {user.result.about}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-effect rounded-xl p-6 border border-white/10 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-500/20 rounded-full mx-auto mb-3">
              <FontAwesomeIcon
                icon={faImage}
                className="text-indigo-400 text-xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {userPosts.length}
            </h3>
            <p className="text-slate-400 text-sm">Posts Shared</p>
          </div>

          <div className="glass-effect rounded-xl p-6 border border-white/10 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-red-500/20 rounded-full mx-auto mb-3">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-red-400 text-xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {userPosts.reduce(
                (total, post) => total + (post.likes?.length || 0),
                0
              )}
            </h3>
            <p className="text-slate-400 text-sm">Total Likes</p>
          </div>

          <div className="glass-effect rounded-xl p-6 border border-white/10 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-full mx-auto mb-3">
              <FontAwesomeIcon
                icon={faComment}
                className="text-blue-400 text-xl"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-1">
              {userPosts.reduce(
                (total, post) => total + (post.comments?.length || 0),
                0
              )}
            </h3>
            <p className="text-slate-400 text-sm">Total Comments</p>
          </div>
        </div>

        {/* User Posts Section */}
        <div className="glass-effect rounded-2xl p-6 md:p-8 border border-white/10">
          <h2
            className="text-xl font-bold text-white mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            My Posts ({userPosts.length})
          </h2>

          {userPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.map((post) => (
                <div
                  key={post._id}
                  className="group relative rounded-xl overflow-hidden glass-effect border border-white/10"
                >
                  {/* Post Image */}
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={post.selectedFile}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  {/* Post Info */}
                  <div className="p-4">
                    <h3
                      className="font-semibold text-white text-sm mb-2 line-clamp-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {post.title}
                    </h3>

                    {post.caption && (
                      <p className="text-slate-300 text-xs mb-3 line-clamp-2">
                        {post.caption}
                      </p>
                    )}

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 text-xs bg-indigo-500/20 text-indigo-300 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-slate-500/20 text-slate-400 rounded-full">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faHeart} />
                          {post.likes?.length || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faComment} />
                          {post.comments?.length || 0}
                        </span>
                      </div>

                      <button
                        onClick={() => handleEditPost(post)}
                        className="p-2 rounded-full bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-colors duration-150"
                        title="Edit post"
                      >
                        <FontAwesomeIcon icon={faEdit} className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faImage}
                  className="text-3xl text-slate-400"
                />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                No posts yet
              </h3>
              <p className="text-slate-400 text-sm">
                Start sharing your amazing moments with the FliXiR community!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Post Modal */}
      {editingPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl glass-effect rounded-2xl border border-white/10 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h3
                className="text-xl font-semibold text-white"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Edit Post
              </h3>
              <button
                onClick={handleCancelPostEdit}
                className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors duration-150"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="flex gap-6">
                {/* Post Image */}
                <div className="w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={editingPost.selectedFile}
                    alt={editingPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Edit Form */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h4
                      className="font-semibold text-white mb-2"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      {editingPost.title}
                    </h4>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Caption
                    </label>
                    <textarea
                      name="caption"
                      value={postEditForm.caption}
                      onChange={handlePostEditChange}
                      placeholder="Write a caption for your post..."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-150 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Hashtags
                    </label>
                    <input
                      type="text"
                      name="tags"
                      value={postEditForm.tags}
                      onChange={handlePostEditChange}
                      placeholder="travel, photography, sunset (separate with commas)"
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-150"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Separate hashtags with commas
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
              <button
                onClick={handleCancelPostEdit}
                className="px-6 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors duration-150 font-medium"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Crop Modal */}
      <ImageCropModal
        isOpen={showImageCropModal}
        onClose={handleImageCropClose}
        onSave={handleImageCropSave}
        currentImage={editForm.profilePicture}
      />
    </div>
  );
};

export default Account;
