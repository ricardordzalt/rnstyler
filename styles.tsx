import {Text, View, TextInput, Pressable} from 'react-native';

export const appStyles = {
  View1: [
    View,
    'flex-1 android:bg-amayaPurple ios:bg-customBlue justify-center items-center pl-50 pr-50 pb-50',
  ],
  Title: [Text, 'text-white self-start font-bold font-size-25 font-bold'],
  Subtitle: [Text, 'text-white font-size-18 self-start mt-15'],
  InputView: [View, 'mt-70 mx-auto self-start'],
  Label1: [Text, 'text-white font-bold font-size-18'],
  TextInput1: [
    TextInput,
    'bg-white w-250 mt-10 pl-15 font-size-18 h-45 shadow',
  ],
  Button1: [
    View,
    'mt-hp(5) android:bg-#33218a ios:bg-#303023 w-wp(50) h-hp(6) items-center justify-center rounded-10',
  ],
  TextButton1: [Text, 'text-white font-bold font-size-18'],
  StyledView: [View, 'flex-1 justify-center items-center p-20 bg-#2962FF'],
  StyledButton: [Pressable, 'w-200 h-50 justify-center rounded-10 bg-#B9DBFF'],
  StyledTextButton: [Text, 'text-center font-bold font-size-17 text-#437'],
};
