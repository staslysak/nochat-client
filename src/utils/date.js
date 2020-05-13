import moment from "moment";

export const diffTime = (date, diff = "days") => {
  return moment().diff(+date, diff);
};

export const formatDate = (date, format = "HH:mm") => {
  if (date) {
    return moment(+date).format(format);
  }
};

export const renderDiffTimeLabel = (date) => {
  const timeDiff = diffTime(+date);

  switch (timeDiff) {
    case 0:
      return "Today";
    case 1:
      return "Yesterday";
    default:
      return formatDate(date, "MMMM D");
  }
};

export const renderTimeline = (messages) => {
  const timeline = {};

  if (messages.length) {
    messages.forEach(({ createdAt }, idx) => {
      const timeDiff = diffTime(createdAt, "days");
      if (timeline[timeDiff] === undefined) {
        timeline[timeDiff] = idx;
      }
    });
  }

  return timeline;
};
