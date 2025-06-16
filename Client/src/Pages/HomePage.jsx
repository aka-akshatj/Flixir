import React, { useEffect, useState } from "react";
import Posts from "../containers/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, getUserPosts } from "../actions/posts";
import Form from "../components/Form/Form";
import UserPanel from "../containers/UserPanel/UserPanel";

const HomePage = () => {
  const [currentID, setCurrentID] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.form);
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    //dispatching the action based on active tab
    if (activeTab === "all") {
      dispatch(getPosts());
    } else if (activeTab === "my" && user) {
      dispatch(getUserPosts());
    }
  }, [dispatch, currentID, activeTab, user]);

  return (
    <div className="min-h-screen">
      {/* Form Modal */}
      {showForm && (
        <Form currentID={currentID} setCurrentID={setCurrentID}></Form>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6">
        {/* Welcome Header */}
        <div className="mb-8 text-center">
          <h1
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Welcome to FliXiR
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Share your moments, connect with friends, and discover amazing
            content.
          </p>
        </div>

        {/* Tabs */}
        {user && (
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="glass-effect rounded-full p-1 border border-white/10">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-150 ${
                      activeTab === "all"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                        : "text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    All Posts
                  </button>
                  <button
                    onClick={() => setActiveTab("my")}
                    className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-150 ${
                      activeTab === "my"
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                        : "text-slate-400 hover:text-white hover:bg-white/10"
                    }`}
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    My Posts
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <Posts setCurrentID={setCurrentID} activeTab={activeTab}></Posts>
      </div>
    </div>
  );
};

export default HomePage;
