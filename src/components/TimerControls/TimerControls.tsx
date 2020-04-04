import React from 'react';
import Button from 'antd/es/button';

interface Props {
  started: boolean;
  onClickStart: () => void;
  onClickStop: () => void;
  onClickStartNew: () => void;
}

const TimerControls: React.FC<Props> = props => {
  return (
    <div>
      {!props.started ? (
        <Button onClick={props.onClickStart} type="primary" size="large" block>
          Start
        </Button>
      ) : (
        <>
          <Button onClick={props.onClickStartNew} type="primary" size="large" block>
            Start New
          </Button>
          <Button onClick={props.onClickStop} block>
            Stop
          </Button>
        </>
      )}
    </div>
  );
};

export default TimerControls;
