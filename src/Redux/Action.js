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

export const listView = () => {
  return {
    type: List_View
  };
};
export const gridView = () => {
  return {
    type: Grid_View
  };
};
export const drawer_toggle = () => {
  return {
    type: Drawer_toggle
  };
};

export const archive = (archive) => {
  return {
    type: Archive,
    payload:archive
  };
};

export const colaborator = (colaborator) => {
    return {
      type: Colaborator,
      payload:colaborator
    };
  };
  export const color = (color) => {
    return {
      type: Color,
      payload:color
    };
  };
  export const pin = (pin) => {
    return {
      type: Pin,
      payload:pin
    };
  };
  export const addReminderRedux = (reminder) => {
    return {
      type: Reminder,
      payload:reminder
    };
  };
