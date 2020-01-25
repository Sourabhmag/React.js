import {
  List_View,
  Grid_View,
  Drawer_toggle,
  Archive,
  Colaborator,
  Color,
  Pin,
  Reminder
} from "./Type";
const initialState = {
  view: false,
  drawerPosition: false,
  archive: false,
  colaborator: [],
  color: "",
  pin: false,
  reminder: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case List_View:
      return {
        ...state,
        view: true
      };
    case Grid_View:
      return {
        ...state,
        view: false
      };
    case Drawer_toggle:
      return {
        ...state,
        drawerPosition: !state.drawerPosition
      };
    case Archive:
      return {
        ...state,
        archive: !state.archive
      };
    case Colaborator:
      return {
        ...state,
        colaborator: action.payload
      };
    case Color:
      return {
        ...state,
        color: action.payload
      };
    case Pin:
      return {
        ...state,
        pin: !state.pin
      };
    case Reminder:
      return {
        ...state,
        reminder: action.payload
      };
    default:
      return state;
  }
};
export default reducer;
