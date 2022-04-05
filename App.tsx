import React from 'react';
import {useStyler} from './rn-styler';
import {ThemeProvider} from './rn-styler';
import {appStyles} from './styles';

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
