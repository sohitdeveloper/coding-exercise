export const isBlank = (str) => {
  return !str || /^\s*$/.test(str);
};

export const isEmail = (str) => {
  let filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(str)) {
    return true;
  } else {
    return false;
  }
};
