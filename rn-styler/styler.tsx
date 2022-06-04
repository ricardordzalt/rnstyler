import {Platform, useWindowDimensions} from 'react-native';
import {useColors, useProperties} from './context/Context';
import {styleProperties as PROPERTIES} from './styles/index';
import {getStyleValue} from './utils/getStyleValue';
import {colors as COLORS} from './constants/colors';
import React from 'react';
import * as ReactNative from 'react-native';

type ClassStylesProps = String | any;

type UserStylerProps = {
  [key: string]: ClassStylesProps;
};

const getStyle = (
  classStyles: ClassStylesProps,
  window: any,
  allColors: any,
  allProperties: any,
) => {
  // True when style have the shape [Component, styleString];
  const includesComponent =
    Array.isArray(classStyles) && classStyles.length > 1;
  let styles = {};
  const getStyleFromArrayOfClasses = arrayOfClasses => {
    if (!arrayOfClasses) {
      return;
    }
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
    getStyleFromArrayOfClasses(classStyles.split?.(' '));
    return styles;
  }
  const ComponentWithStyle = (
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
    // In case style prop is an array or object
    const finalStyle = Array.isArray(style)
      ? [styles, ...style]
      : {...styles, ...style};
    return (
      <Component {...rest} style={finalStyle}>
        {children}
      </Component>
    );
  };
  return ComponentWithStyle;
};

const handleUseStylerPropErrors = args => {
  if (args.length === 0 || args[0] === undefined) {
    throw new Error('Use styler arguments cannot be undefined');
  }
};

const useStyler = (...args: any[]) => {
  const [firstArgument, secondArgument] = args;
  handleUseStylerPropErrors(args);
  const firstArgumentIsArray = Array.isArray(firstArgument);
  const firstArgumentIsString = typeof firstArgument === 'string';
  const argsIsComponentAndString =
    typeof firstArgument === 'function' &&
    ['function', 'string'].includes(typeof secondArgument);

  // For screen dimensions
  const window = useWindowDimensions();
  // From provider
  const aditionalColors = useColors();

  const allColors = {
    core: COLORS,
    aditional: aditionalColors,
  };
  // From provider
  const aditionalProperties = useProperties();

  const allProperties = {
    ...PROPERTIES,
    ...aditionalProperties,
  };

  if (
    args.length > 1 &&
    args.every(arg => typeof arg === 'string' || Array.isArray(arg))
  ) {
    const results: any[] = args.map(styleClass =>
      getStyle(styleClass, window, allColors, allProperties),
    );
    return results;
  }

  // Return array of results if hook is used with an array, if not return a single style
  if (firstArgumentIsArray) {
    const firstArgumentIsComponentAndStringArray =
      firstArgument?.length === 2 &&
      typeof firstArgument[0] === 'function' &&
      typeof firstArgument[1] === 'string';
    if (firstArgumentIsComponentAndStringArray) {
      const ComponentWithStyle = getStyle(
        [firstArgument[0], firstArgument[1]],
        window,
        allColors,
        allProperties,
      );
      // Returned as array because it was provided as array arg
      return [ComponentWithStyle];
    }
    const results: any[] = firstArgument.map(styleClass =>
      getStyle(styleClass, window, allColors, allProperties),
    );
    return results;
  }
  if (firstArgumentIsString) {
    const result = getStyle(firstArgument, window, allColors, allProperties);
    return result;
  }
  if (argsIsComponentAndString) {
    return getStyle(
      [firstArgument, secondArgument],
      window,
      allColors,
      allProperties,
    );
  } else {
    throw new Error(
      'Use styler arguments must be either string, function or array',
    );
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

coreComponents.forEach(coreComponent => {
  const CustomComponent = ({className = '', ...props}) => {
    const [Component] = useStyler([[ReactNative[coreComponent], className]]);
    return <Component {...props} />;
  };
  components = {
    ...components,
    //       // [rnKey]: ({className}) => rnValue({props: className}),
    [coreComponent]: CustomComponent,
  };
});

export default components;

export {useStyler};
