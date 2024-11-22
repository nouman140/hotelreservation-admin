const initState = {
  accomodationLoading: false,
  accomdationData: [],
};
const accomodationsReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "ACCOMDATION_LOADER":
      return {
        ...state,
        accomodationLoading: payload,
      };
    case "ACCOMODATIONS":
      return {
        ...state,
        accomdationData: payload,
      };
    case "MORE_ACCOMODATIONS":
      return {
        ...state,
        accomdationData: [...state.accomdationData, ...payload],
      };
    case "DISABLE_LOADMORE":
      return {
        ...state,
        loadMoreBtn: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default accomodationsReducer;
