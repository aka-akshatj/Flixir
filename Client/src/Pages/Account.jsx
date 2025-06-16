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
} from "@fortawesome/free-solid-svg-icons";
import UserLogo from "../img/user.png";
import { useSelector } from "react-redux";

const Account = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const { posts } = useSelector((state) => state.posts);

  // Filter user's posts
  const userPosts = posts.filter(
    (post) =>
      post.creator === user?.result?._id ||
      post.creator === user?.result?.googleId
  );

  useEffect(() => {
    if (user?.result) {
      setEditForm({
        firstName:
          user.result.firstName || user.result.name?.split(" ")[0] || "",
        lastName: user.result.lastName || user.result.name?.split(" ")[1] || "",
        email: user.result.email || "",
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

  const handleSaveProfile = () => {
    // Here you would typically make an API call to update the user profile
    console.log("Saving profile:", editForm);
    setIsEditing(false);
  };

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
                {user.result.imageUrl ? (
                  <img
                    src={user.result.imageUrl}
                    alt={user.result.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={UserLogo}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-indigo-500 hover:bg-indigo-600 rounded-full flex items-center justify-center text-white transition-colors duration-300">
                <FontAwesomeIcon icon={faCamera} className="text-sm" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-300"
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
                      {user.result.name ||
                        `${user.result.firstName} ${user.result.lastName}` ||
                        user.result.username}
                    </h1>
                    <button
                      onClick={handleEditToggle}
                      className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-all duration-300"
                      title="Edit Profile"
                    >
                      <FontAwesomeIcon icon={faEdit} className="text-sm" />
                    </button>
                  </div>

                  <div className="space-y-2 text-slate-300">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPosts.map((post) => (
                <div
                  key={post._id}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.selectedFile}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center text-white">
                      <h3 className="font-semibold text-sm mb-2">
                        {post.title}
                      </h3>
                      <div className="flex items-center justify-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faHeart} />
                          {post.likes?.length || 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faComment} />
                          {post.comments?.length || 0}
                        </span>
                      </div>
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
    </div>
  );
};

export default Account;
