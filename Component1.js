import {Text} from 'react-native';
import React from 'react';

const Component1 = ({children, style}) => {
  return <Text style={{color: '#fff', ...style}}>{children}</Text>;
};

export default Component1;
