import {View, Pressable, Text} from 'react-native';

export const appStyles = [
  [View, ({className}) => `${className}`],
  [
    Pressable,
    'rounded-hp(3) w-wp(60) h-wp(20) bg-purple-600 items-center justify-center',
  ],
  [
    Text,
    ({color = 'primary'}) =>
      `color-${color === 'primary' ? 'blue-200' : color}`,
  ],
];
