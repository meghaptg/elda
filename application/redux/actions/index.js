export const addEntry = (data) => {
  return {
    type: "ADD_ENTRY",
    payload: data,
  };
};

export const changeTheme = (theme) => {
  return {
    type: "CHANGE_THEME",
    payload: theme,
  };
};
