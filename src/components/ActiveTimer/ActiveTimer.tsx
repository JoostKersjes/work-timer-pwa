import React from "react";
import { Moment } from "moment";

import styles from "./ActiveTimer.module.css";

interface Props {
  timer: Moment;
}

const ActiveTimer: React.FC<Props> = (props) => {
  return (
    <div>
      <span className={styles.clock}>
        {props.timer.format("HH")}:{props.timer.format("mm")}
      </span>
      <span className={styles.seconds}>{props.timer.format("ss")}</span>
    </div>
  );
};

export default ActiveTimer;
