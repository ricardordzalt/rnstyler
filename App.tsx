import React from 'react';
import {View, Text, TextInput, Pressable, Platform} from 'react-native';
import {useStyler} from './rn-styler';
import {ThemeProvider} from './rn-styler';
import {appStyles} from './styles';

const Provider = () => (
  <ThemeProvider
    theme={{
      colors: {amayaPurple: '#854ba1', customBlue: '#51a3a3'},
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
  const {
    View1,
    Title,
    Subtitle,
    InputView,
    Label1,
    TextInput1,
    Button1,
    TextButton1,
    StyledView,
    StyledButton,
    StyledTextButton,
  } = useStyler(appStyles);
  return (
    <StyledView>
      <StyledButton>
        <StyledTextButton>Customized Button</StyledTextButton>
      </StyledButton>
    </StyledView>
  );
  return (
    <View1>
      <Title>Regístrate</Title>
      <Subtitle>
        Escríbe tus datos sólo una vez para que puedas tener acceso siempre.
      </Subtitle>
      <InputView>
        <Label1>Tu número de celular</Label1>
        <TextInput1 placeholder="55 00 00 00 00" />
      </InputView>

      <Pressable>
        <Button1>
          <TextButton1>Regístrate</TextButton1>
        </Button1>
      </Pressable>
    </View1>
  );
};

export default Provider;
