// import { toast } from "react-toastify";
import firebase from "../../config/firebase";
import { LOGIN, LOGOUT } from "../types";
// import firebase from "../../config/firebase";

export const loginAction = (creds) => {
  return (dispatch) => {
    dispatch(Loader(true));
    firebase
      .auth()
      .signInWithEmailAndPassword(creds.email, creds.password)
      .then((data) => {
        dispatch(reRegisterSnapshot(data.user?.uid));
      })
      .catch((error) => {
        dispatch(Loader(false));
        alert(error.message);
      });
  };
};

export const reRegisterSnapshot = (id) => async (dispatch) => {
  firebase
    .firestore()
    .collection("users")
    .doc(id)
    .onSnapshot(async (doc) => {
      if (doc.data().role == "admin") {
        dispatch({
          type: LOGIN,
          payload: { id: doc.id, ...doc.data() },
        });
      } else {
        alert("Only admin Accounts allowed to access the panel");
      }
      dispatch(Loader(false));
    });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
const Loader = (data) => async (dispatch) => {
  dispatch({
    type: "AUTH_LOADER",
    payload: data,
  });
};
