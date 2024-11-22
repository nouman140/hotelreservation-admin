import firebase from "../../config/firebase";

export const getMessages = () => async (disptach) => {
  disptach(loader(true));
  try {
    firebase
      .firestore()
      .collection("contacts")
      .orderBy("createdAt", "desc")
      .onSnapshot((query) => {
        let messages = [];
        for (let doc of query.docs) {
          if (doc.exists) {
            messages.push({ id: doc.id, ...doc.data() });
          }
        }
        disptach({
          type: "MESSAGES",
          payload: messages,
        });
        disptach(loader(false));
      });
  } catch (error) {
    disptach(loader(false));
    console.log(error);
  }
};

export const updateMessageStatus = (ID, status) => async (disptach) => {
  try {
    firebase
      .firestore()
      .collection("contacts")
      .doc(ID)
      .update({
        responseStatus: status,
      })
      .then(() => {
        alert(`${status} successfully`);
      });
  } catch (error) {
    console.log(error);
  }
};
export const deleteMessageAction =
  (ID, onSuccess = () => {}) =>
  async (dispatch) => {
    try {
      firebase
        .firestore()
        .collection("contacts")
        .doc(ID)
        .delete()
        .then(() => {
          onSuccess();
        });
    } catch (error) {
      console.log(error);
    }
  };

export const loader = (val) => async (dispatch) => {
  dispatch({
    type: "MESSAGES_LOADER",
    payload: val,
  });
};
