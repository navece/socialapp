import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
  SET_SCREAM,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import Axios from "axios";
//get all screams
export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  Axios.get("/screams")
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: SET_SCREAMS,
        payload: [],
      });
    });
};

//like scream
export const likeScream = (screamId) => (dispatch) => {
  Axios.get(`/screams/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//unlike scream
export const unlikeScream = (screamId) => (dispatch) => {
  Axios.get(`/screams/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//submit comment
export const submitComment = (screamId, commentData) => (dispatch) => {
  Axios.post(`/screams/${screamId}/comment`, commentData)
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//delete screams
export const deleteScream = (screamId) => (dispatch) => {
  Axios.delete(`/screams/${screamId}/delete`)
    .then((res) => {
      dispatch({ type: DELETE_SCREAM, payload: screamId });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
    });
};
//post a scream
export const postScream = (newScream) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.post("/screams", newScream)
    .then((res) => {
      dispatch({ type: POST_SCREAM, payload: res.data });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//get scream Details
export const getScream = (screamId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  Axios.get(`/screams/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  Axios.get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({ type: SET_SCREAMS, payload: res.data.screams });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: SET_SCREAMS, payload: null });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
