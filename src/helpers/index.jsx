import moment from "moment";

export const getDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};
export const getTime = (date) => {
  return moment(date).format("HH:mm");
};

export const getAgo = (date) => {
  return moment(date).fromNow(true);
};

export const link =
  "https://firebasestorage.googleapis.com/v0/b/ceetok-8f448.appspot.com/o/";
export const suffix = "?alt=media&token=e22e411b-04b4-49ed-a42a-a90ea37567fc";
export const getImage = (url) => {
  return `${link}${encodeURIComponent(url)}${suffix}`;
};
