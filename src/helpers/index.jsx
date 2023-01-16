import moment from "moment";

export const getDate = (date) => {
  return moment(date).format("MMMM Do YYYY");
};
export const getTime = (date) => {
  return moment(date).format("h:mma");
};
