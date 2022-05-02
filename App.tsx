import React from 'react';
import RNStyler, {View, Pressable, Text} from './rn-styler';

const App = () => {
  return (
    <View className="flex-1 justify-center items-center bg-#f00000">
      <Pressable className="w-wp(50) bg-red-300 rounded-hp(4) py-hp(1) shadow">
        <Text className="color-#00ff0b font-size-hp(3) text-center">
          Texto 1
        </Text>
      </Pressable>
      <Text className="font-size-40 mt-hp(2) text-green-600">
        Texto 2
      </Text>
    </View>
  );
};

export default App;
