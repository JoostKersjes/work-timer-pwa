import React from "react";
import ActiveTimer from "../../components/ActiveTimer/ActiveTimer";
import moment from "moment";

const Timer: React.FC = () => {
  return (
    <div>
      timer
      <ActiveTimer timer={moment()} />
    </div>
  );
};

export default Timer;
