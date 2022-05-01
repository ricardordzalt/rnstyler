import React from 'react';
import RNStyler, {ThemeProvider, View} from './rn-styler';

const App = () => {
  return (
    <RNStyler.View className="flex-1 justify-center items-center bg-#f00000">
      <RNStyler.Pressable className="w-wp(50) bg-red-300 rounded-hp(4) py-hp(1) shadow">
        <RNStyler.Text className="color-#00ff0b font-size-hp(3) text-center">
          Texto 1
        </RNStyler.Text>
      </RNStyler.Pressable>
      <RNStyler.Text className="font-size-40 mt-hp(2) text-green-600">
        Texto 2
      </RNStyler.Text>
    </RNStyler.View>
  );
};

export default App;
