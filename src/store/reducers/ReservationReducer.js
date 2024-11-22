const initState = {
  reservationLoading: false,
  reservationData: [],
};
const reservationReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "RESERVATION_LOADER":
      return {
        ...state,
        reservationLoading: payload,
      };
    case "RESERVATIONS":
      return {
        ...state,
        reservationData: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default reservationReducer;
