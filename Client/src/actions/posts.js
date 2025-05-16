// !This file contains the action creators related to posts.

import * as api from "../api";
import {
    CREATE,
    FETCH_ALL,
    UPDATE,
    DELETE,
    LIKE,
    FETCH_POST,
    START_LOADING,
    END_LOADING,
    CMT_START_LOADING,
    CMT_END_LOADING,
    COMMENT,
} from "../constants/actionTypes";

//Action Creators - returns an action.
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        const action = { type: FETCH_POST, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts();
        const action = { type: FETCH_ALL, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        const action = { type: CREATE, payload: data };
        dispatch(action);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        dispatch({ type: CMT_START_LOADING });
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        dispatch({ type: CMT_END_LOADING });
        return data.comments;
    } catch (error) {
        console.log(error);
    }
};
