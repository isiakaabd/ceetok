import moment from "moment";

export const getDate = (date) => {
  return moment(date).format("DD-MM-YYYY");
};
export const getDates = (date) => {
  return moment(date).format("YYYY-MM-DD");
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
  return url ? `${link}${encodeURIComponent(url)}${suffix}` : null;
};

export const getTimeMoment = (startDate) => {
  const durationObj = moment.duration(
    moment(new Date()).diff(moment(startDate))
  );

  if (durationObj.asMonths() >= 1) {
    return durationObj.asMonths().toFixed(0) + "M";
  } else if (durationObj.asDays() >= 1) {
    return durationObj.asDays().toFixed(0) + "d";
  } else if (durationObj.asDays() >= 7) {
    return durationObj.asWeeks().toFixed(0) + "w";
  } else if (durationObj.asHours() >= 1) {
    return durationObj.asHours().toFixed(0) + "h";
  } else if (durationObj.asMinutes() > 1) {
    return durationObj.asMinutes().toFixed(0) + "m ";
  }
  return durationObj.seconds().toFixed(0) + "s";
  // return formattedDuration;
};
