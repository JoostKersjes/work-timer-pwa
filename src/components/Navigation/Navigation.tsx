import React from 'react';
import { useHistory } from 'react-router-dom';
import Tabs from 'antd/es/tabs';
import Settings from '../Settings/Settings';
const { TabPane } = Tabs;

const Navigation: React.FC = props => {
  const history = useHistory();

  return (
    <Tabs
      size="large"
      activeKey={history.location.pathname}
      onChange={key => history.replace(key)}
      tabBarExtraContent={<Settings />}
    >
      <TabPane tab="Timer" key="/">
        {props.children}
      </TabPane>
      <TabPane tab="Log" key="/log">
        {props.children}
      </TabPane>
    </Tabs>
  );
};

export default Navigation;
