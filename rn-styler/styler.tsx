import {Platform, useWindowDimensions} from 'react-native';
import {useColors, useProperties} from './context/Context';
import {styleProperties as PROPERTIES} from './styles/index';
import {getStyleValue} from './utils/getStyleValue';
import {colors as COLORS} from './constants/colors';
import React from 'react';
import * as ReactNative from 'react-native';
import {isComponent} from './utils/validateComponent';

type ClassStylesProps = String | any;

type UserStylerProps = {
  [key: string]: ClassStylesProps;
};

const styler = (
  classStyles: ClassStylesProps,
  window: any,
  allColors: any,
  allProperties: any,
) => {
  const includesComponent =
    Array.isArray(classStyles) && classStyles.length > 1;
  let styles = {};
  const getStyleFromArrayOfClasses = arrayOfClasses => {
    for (let i = 0; i < arrayOfClasses.length; i++) {
      let classProp = arrayOfClasses[i];
      const specifiesPlatform =
        classProp.startsWith('android:') || classProp.startsWith('ios:');
      const matchPlatform = specifiesPlatform
        ? (classProp.startsWith('android:') && Platform.OS === 'android') ||
          (classProp.startsWith('ios:') && Platform.OS === 'ios')
        : true;
      if (matchPlatform) {
        classProp = classProp.replace('ios:', '').replace('android:', '');
      }
      if (!matchPlatform) {
      } else if (allProperties[classProp]) {
        styles = {
          ...styles,
          ...allProperties[classProp],
        };
      } else {
        styles = {
          ...styles,
          ...getStyleValue(classProp, window, {
            ...allColors.core,
            ...allColors.aditional,
          }),
        };
      }
    }
  };
  if (!includesComponent) {
    getStyleFromArrayOfClasses(classStyles.split(' '));
  }
  return includesComponent
    ? (
        props = {
          style: null,
          children: null,
        },
      ) => {
        const {style = {}, children, ...rest} = props;
        if (includesComponent) {
          const classArray =
            typeof classStyles[1] === 'string'
              ? classStyles[1].split(' ')
              : classStyles[1](rest).split(' ');
          getStyleFromArrayOfClasses(classArray);
        } else {
          const classArray = Array.isArray(classStyles)
            ? classStyles[0].split(' ')
            : classStyles.split(' ');
          getStyleFromArrayOfClasses(classArray);
        }
        const Component = includesComponent ? classStyles[0] : null;
        return (
          <Component {...rest} style={{...styles, ...style}}>
            {children}
          </Component>
        );
      }
    : styles;
};

const useStyler = (stylesClasses?: UserStylerProps) => {
  const window = useWindowDimensions();
  const aditionalColors = useColors();
  const allColors = {
    core: COLORS,
    aditional: aditionalColors,
  };
  const aditionalProperties = useProperties();
  const allProperties = {
    ...PROPERTIES,
    ...aditionalProperties,
  };
  if (stylesClasses && typeof Array.isArray(stylesClasses)) {
    let styles: any = [];
    for (let i = 0; i < stylesClasses.length; i++) {
      const value = stylesClasses[i];
      styles = [...styles, styler(value, window, allColors, allProperties)];
    }
    return styles;
  } else if (typeof stylesClasses === 'string') {
    return [styler(stylesClasses, window, allColors, allProperties)];
  } else {
    return [];
  }
};

const coreComponents = [
  'ActivityIndicator',
  'Button',
  'FlatList',
  'Image',
  'ImageBackground',
  'KeyboardAvoidingView',
  'Modal',
  'Pressable',
  'RefreshControl',
  'ScrollView',
  'SectionList',
  'StatusBar',
  'Switch',
  'Text',
  'TextInput',
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'View',
  'VirtualizedList',
];

let components = {};

coreComponents.forEach((coreComponent) => {
  const CustomComponent = ({className = '', ...props}) => {
    const [Component] = useStyler([[ReactNative[coreComponent], className]]);
    return <Component {...props} />;
  };
  components = {
    ...components,
//       // [rnKey]: ({className}) => rnValue({props: className}),
    [coreComponent]: CustomComponent,
  };
})

// let components = {};

// Object.entries(ReactNative).forEach(([rnKey, rnValue]) => {
//   if (isComponent(rnValue)) {
//     const CustomComponent = ({className = '', ...props}) => {
//       const [Component] = useStyler([[rnValue, className]]);
//       return <Component {...props} />;
//     };
//     components = {
//       ...components,
//       // [rnKey]: ({className}) => rnValue({props: className}),
//       [rnKey]: CustomComponent,
//     };
//   }
// });

export default components;

export {useStyler, styler};
