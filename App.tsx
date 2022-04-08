import React from 'react';
import {useStyler} from './rn-styler';
import {ThemeProvider} from './rn-styler';
import {appStyles} from './styles';
import {View, Pressable, Text} from 'react-native';

const Provider = () => (
  <ThemeProvider
    theme={{
      colors: {purpleBg: '#854ba1', customBlue: '#51a3a3'},
      properties: {
        shadow: {
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
        'background-red-fontSize-big-custom-class': {
          backgroundColor: 'red',
          fontSize: 20,
        },
      },
    }}>
    <App />
  </ThemeProvider>
);

const App = () => {
  const [MainView, BlueButton, CText] = useStyler(appStyles);

  const [CText2] = useStyler([[CText, 'text-red-100']]);

  return (
    <MainView>
      <BlueButton>
        <CText2 style={{fontSize: 30}}>I'm a styled pressable button</CText2>
      </BlueButton>
    </MainView>
  );
};

export default Provider;
