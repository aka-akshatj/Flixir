import React, { useEffect, useState } from "react";
import Posts from "../containers/Posts/Posts";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";
import Form from "../components/Form/Form";
import UserPanel from "../containers/UserPanel/UserPanel";
import "./home.css";

const HomePage = () => {
  const [currentID, setCurrentID] = useState(null);
  const dispatch = useDispatch();
  const showForm = useSelector((state) => state.form);

  useEffect(() => {
    //dispatching the action: get all posts
    dispatch(getPosts());
  }, [dispatch, currentID]);

  return (
    <div>
      {showForm && (
        <Form currentID={currentID} setCurrentID={setCurrentID}></Form>
      )}
      <div className="homepage">
        <div className="p-container">
          <Posts setCurrentID={setCurrentID}></Posts>
        </div>
        <div className="up-container">
          <UserPanel></UserPanel>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
