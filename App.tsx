import React from 'react';
import {Text, ThemeProvider, View} from './rn-styler';

const App = () => {
  return (
    <ThemeProvider
      theme={{
        properties: {
          redText: {
            fontSize: 55,
            color: '#f00',
          },
        },
        colors: {
          navyBlue: '#33F',
        },
      }}>
      <Inside />
    </ThemeProvider>
  );
};

const Inside = () => {
  return (
    <View className="flex-1 bg-navyBlue justify-center items-center">
      <Text className="redText">Texto 1</Text>
    </View>
  );
};

export default App;
