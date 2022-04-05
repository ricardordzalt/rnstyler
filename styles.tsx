import {Text, View, Pressable} from 'react-native';

export const appStyles = [
  [
    View,
    'flex-1 android:bg-purpleBg ios:bg-customBlue items-center justify-center',
  ],
  [
    Text,
    ({primary, danger}) =>
      `text-${
        primary ? 'blue-500' : danger ? 'red-500' : 'white'
      } font-bold font-size-hp(3) font-bold`,
  ],
  [
    Pressable,
    ({bgColor}) =>
      `w-wp(40) bg-${
        bgColor ?? 'gray-300'
      } px-hp(2) py-hp(1) mt-hp(20) rounded-hp(3) w-wp(50) shadow`,
  ],
  [Text, 'text-white font-bold font-size-hp(2) text-center'],
  [Text, 'mt-hp(10) background-red-fontSize-big-custom-class'],
];
