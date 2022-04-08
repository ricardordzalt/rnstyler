import {View, Pressable} from 'react-native';
import Component1 from './Component1';

export const appStyles = [
  [View, 'bg-blue-400 flex-1 justify-center items-center'],
  [
    Pressable,
    'rounded-hp(3) w-wp(60) h-wp(20) bg-purple-600 items-center justify-center',
  ],
  [Component1, 'text-red-400'],
];
