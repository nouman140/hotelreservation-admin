import firebase from "../../config/firebase";

export const getReservations = () => async (disptach) => {
  disptach(loader(true));
  try {
    firebase
      .firestore()
      .collection("reservation")
      .orderBy("createdAt", "desc")
      .onSnapshot((query) => {
        let reservations = [];
        for (let doc of query.docs) {
          if (doc.exists) {
            reservations.push({ id: doc.id, ...doc.data() });
          }
        }
        disptach({
          type: "RESERVATIONS",
          payload: reservations,
        });
        disptach(loader(false));
      });
  } catch (error) {
    disptach(loader(false));
    console.log(error);
  }
};

export const updateReservation = (ID, status) => async (disptach) => {
  try {
    firebase
      .firestore()
      .collection("reservation")
      .doc(ID)
      .update({
        checkedInStatus: status,
      })
      .then(() => {
        alert(`${status} successfully`);
      });
  } catch (error) {
    console.log(error);
  }
};
export const deleteReservationAction =
  (ID, onSuccess = () => {}) =>
  async (dispatch) => {
    try {
      firebase
        .firestore()
        .collection("reservation")
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
    type: "RESERVATION_LOADER",
    payload: val,
  });
};
