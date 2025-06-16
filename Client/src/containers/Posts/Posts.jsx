import React from "react";
import Post from "../../components/Post/Post";
import { useSelector } from "react-redux";
import Spinner from "../../img/Spinner-1s-200px.svg";

const Posts = ({ setCurrentID, activeTab }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const revPosts = posts.slice(0).reverse(); //to show the newest posts first

  // Empty state
  if (!posts.length && !isLoading) {
    const isMyPosts = activeTab === "my";

    // Regular empty state
    return (
      <div className="flex flex-col items-center justify-center py-16 px-8 text-center">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3
          className="text-xl font-semibold text-white mb-2"
          style={{ fontFamily: "Poppins, sans-serif" }}
        >
          {isMyPosts ? "No posts created yet" : "No posts yet"}
        </h3>
        <p className="text-slate-400 text-sm max-w-md leading-relaxed">
          {isMyPosts
            ? "You haven't created any posts yet. Click the create button to share your first moment!"
            : "Be the first to share your amazing moments with the FliXiR community. Click the create button to get started!"}
        </p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Loading skeleton */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="glass-effect rounded-2xl overflow-hidden border border-white/10 animate-pulse"
          >
            <div className="aspect-[4/3] bg-slate-700"></div>
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-700 rounded w-20"></div>
                  <div className="h-2 bg-slate-700 rounded w-16"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-3 bg-slate-700 rounded w-8"></div>
                  <div className="h-3 bg-slate-700 rounded w-8"></div>
                </div>
                <div className="h-3 bg-slate-700 rounded w-4"></div>
              </div>
            </div>
          </div>
        ))}

        {/* Loading message */}
        <div className="col-span-full text-center py-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-effect border border-white/10">
            <img src={Spinner} alt="loading-spinner" className="w-5 h-5" />
            <p className="text-slate-300 text-sm font-medium">
              Loading amazing content...
            </p>
          </div>
          <p className="text-slate-500 text-xs mt-2">
            This may take a moment on first load
          </p>
        </div>
      </div>
    );
  }

  // Posts feed
  return (
    <div>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {revPosts.map((post, index) => (
          <div
            key={post._id}
            className="animate-fade-in"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <Post post={post} setCurrentID={setCurrentID} />
          </div>
        ))}
      </div>

      {/* End of feed message */}
      <div className="text-center py-8 mt-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
          <p className="text-slate-400 text-sm">
            {activeTab === "my"
              ? "You've seen all your posts!"
              : "You're all caught up!"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Posts;
