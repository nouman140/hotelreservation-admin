const initState = {
  messagesLoading: false,
  messagesData: [],
};
const messageReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "MESSAGES_LOADER":
      return {
        ...state,
        messagesLoading: payload,
      };
    case "MESSAGES":
      return {
        ...state,
        messagesData: payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default messageReducer;
