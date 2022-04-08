import React from 'react';
import {useStyler} from './rn-styler';
import {ThemeProvider} from './rn-styler';
import {appStyles} from './styles';
import {View, Text, Pressable} from 'react-native';

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
  const [Container, Title, Button, ButtonTitle, BigRedText] =
    useStyler(appStyles);

  const [MainView, BlueButton, TextButton] = useStyler([
    [View, 'bg-blue-400 flex-1 justify-center items-center'],
    [
      Pressable,
      'rounded-hp(3) w-wp(60) h-wp(20) bg-purple-600 items-center justify-center',
    ],
    [Text, 'text-white font-bold font-size-hp(1.7) text-center'],
  ]);

  return (
    <MainView>
      <BlueButton>
        <TextButton>I'm a styled pressable button</TextButton>
      </BlueButton>
    </MainView>
  );

  return (
    <Container prop1="XD">
      <Title>Normal title</Title>
      <Title primary>Blue title</Title>
      <Title danger>Red title</Title>

      <Button bgColor="customBlue">
        <ButtonTitle>Custom blue Buttom</ButtonTitle>
      </Button>

      <Button>
        <ButtonTitle>Default gray Button</ButtonTitle>
      </Button>

      <BigRedText>Giant Text from Provider</BigRedText>
    </Container>
  );
};

export default Provider;
