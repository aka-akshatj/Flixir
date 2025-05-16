import React from "react";
import "./Posts.css";
import Post from "../../components/Post/Post";
import { useSelector } from "react-redux";
import Spinner from "../../img/Spinner-1s-200px.svg";

const Posts = ({ setCurrentID }) => {
    const { posts, isLoading } = useSelector((state) => state.posts);
    const revPosts = posts.slice(0).reverse(); //to show the newest posts first

    // console.log(posts);
    if (!posts.length && !isLoading) {
        return (
            <div className="loading">
                <h1>No posts to display!</h1>
            </div>
        );
    }

    return isLoading ? (
        <div className="loading">
            <img src={Spinner} alt="loading-spinner" />
            <p className="loading-text">
                Please wait... This app is using a free server resulting in
                increased loading times.
            </p>
        </div>
    ) : (
        <div className="posts-container">
            {revPosts.map((post) => (
                <Post
                    key={post._id}
                    post={post}
                    setCurrentID={setCurrentID}
                ></Post>
            ))}
        </div>
    );
};

export default Posts;
