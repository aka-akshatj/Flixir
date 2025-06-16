import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedPosts } from "../actions/users";
import Post from "../components/Post/Post";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

const Saved = () => {
  const [currentID, setCurrentID] = useState(null);
  const dispatch = useDispatch();
  const savedPosts = useSelector((state) => state.savedPosts);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (user?.result) {
      dispatch(getSavedPosts());
    }
  }, [dispatch, user]);

  if (!user?.result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Please sign in to view your saved posts
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
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-2xl text-yellow-400"
              />
            </div>
            <h1
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              Saved Posts
            </h1>
          </div>
          <p className="text-slate-400 text-sm md:text-base">
            Your collection of saved posts from the FliXiR community
          </p>
        </div>

        {/* Saved Posts */}
        {savedPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedPosts.map((post) => (
              <Post key={post._id} post={post} setCurrentID={setCurrentID} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 flex items-center justify-center">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-3xl text-yellow-400"
              />
            </div>
            <h3
              className="text-xl font-semibold text-white mb-2"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              No saved posts yet
            </h3>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Start saving posts you love by clicking the bookmark icon on any
              post. Your saved posts will appear here for easy access later.
            </p>
          </div>
        )}

        {/* End of saved posts message */}
        {savedPosts.length > 0 && (
          <div className="text-center py-8 mt-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <p className="text-slate-400 text-sm">
                You've seen all your saved posts!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
