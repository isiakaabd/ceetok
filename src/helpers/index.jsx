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

export const link = "https://ceetok-8f448.appspot.com/";
