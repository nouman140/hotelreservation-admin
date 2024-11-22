import firebase from "../../config/firebase";

export const addAccomodationActions =
  (payload, onSuccess = () => {}) =>
  async (dispatch) => {
    const { images, ...rest } = payload;
    dispatch(loader(true));
    try {
      const imageUrls = await Promise.all(
        images.map(async (image) => {
          const storageRef = firebase
            .storage()
            .ref()
            .child(`accomodation_images/${image.name}`);
          await storageRef.put(image);
          return await storageRef.getDownloadURL();
        })
      );
      const dataWithUrls = { ...rest, images: imageUrls };
      await firebase
        .firestore()
        .collection("accomodations")
        .add({
          ...dataWithUrls,
          createdAt: firebase.firestore.Timestamp.now(),
        });
      dispatch(loader(false));
      onSuccess();
    } catch (error) {
      dispatch(loader(false));
      console.error("Error adding accomodation:", error);
    }
  };

export const getAllAccomodations = () => async (dispatch) => {
  dispatch(loader(true));
  try {
    firebase
      .firestore()
      .collection("accomodations")
      .orderBy("createdAt", "desc")
      .limit(10)
      .onSnapshot((query) => {
        let data = [];
        for (let doc of query.docs) {
          if (doc.exists) {
            data.push({ id: doc.id, ...doc.data() });
          }
        }
        if (data.length < 10) {
          dispatch({
            type: "DISABLE_LOADMORE",
            payload: true,
          });
        }
        dispatch({
          type: "ACCOMODATIONS",
          payload: data,
        });
        dispatch(loader(false));
      });
  } catch (error) {
    dispatch(loader(false));
    console.error("Error Getting accomodation:", error);
  }
};

export const fetchMoreAccomodations = (item) => async (dispatch) => {
  try {
    firebase
      .firestore()
      .collection("accomodations")
      .orderBy("createdAt", "desc")
      .startAfter(item.createdAt)
      .limit(10)
      .onSnapshot((query) => {
        let data = [];
        for (let doc of query.docs) {
          if (doc.exists) {
            data.push({ id: doc.id, ...doc.data() });
          }
        }
        if (data.length < 10) {
          dispatch({
            type: "DISABLE_LOADMORE",
            payload: true,
          });
        }
        dispatch({
          type: "MORE_ACCOMODATIONS",
          payload: data,
        });
        dispatch(loader(false));
      });
  } catch (error) {
    dispatch(loader(false));
    console.error("Error Getting accomodation:", error);
  }
};
export const deleteAccomodationAction =
  (ID, onSuccess = () => {}) =>
  async (dispatch) => {
    try {
      firebase
        .firestore()
        .collection("accomodations")
        .doc(ID)
        .delete()
        .then(() => {
          onSuccess();
        });
    } catch (error) {
      console.log(error);
    }
  };

export const updateAccomodationActions =
  (payload, onSuccess = () => {}) =>
  async (dispatch) => {
    const { id, images, ...rest } = payload;
    dispatch(loader(true));

    try {
      const imageUrls = await Promise.all(
        images?.map(async (image) => {
          if (image instanceof File) {
            const storageRef = firebase
              .storage()
              .ref()
              .child(`accomodation_images/${image.name}`);
            await storageRef.put(image);
            return await storageRef.getDownloadURL();
          }
          return image;
        })
      );
      const dataWithUrls = { ...rest, images: imageUrls };

      await firebase
        .firestore()
        .collection("accomodations")
        .doc(id)
        .update({
          ...dataWithUrls,
        });

      dispatch(loader(false));
      onSuccess();
    } catch (error) {
      dispatch(loader(false));
      console.error("Error updating accomodation:", error);
    }
  };

export const loader = (val) => async (dispatch) => {
  dispatch({
    type: "ACCOMDATION_LOADER",
    payload: val,
  });
};
