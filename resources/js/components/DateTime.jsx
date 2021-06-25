import React, { memo } from "react";
import moment from "moment";

export default memo(({ render, type, data, style, ...props }) => {
  const datetime =
    type === "day"
      ? moment(data).calendar(null, {
          sameDay: "hh:mm A",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "DD/MM/YYYY",
          sameElse: "DD/MM/YYYY",
        })
      : moment(data).format("hh:mm A");

  return (
    <p {...props} style={style}>
      {render ? render({ datetime }) : datetime}
    </p>
  );
});

const When = () => (
  <p className="text-xs text-gray-500 ml-auto">
    {moment(created_at).calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "ddd ll",
      sameElse: "ddd ll",
    })}
  </p>
);
