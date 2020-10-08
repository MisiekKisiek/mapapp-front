export const markers = (state = [], action) => {
  switch (action.type) {
    case "SET_MARKERS":
      return [...action.markers];
    default:
      return state;
  }
};
