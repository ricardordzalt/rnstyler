import {Platform, useWindowDimensions} from 'react-native';
import {useColors, useProperties} from './context/Context';
import {styleProperties as PROPERTIES} from './styles/index';
import {getStyleValue} from './utils/getStyleValue';
import {colors as COLORS} from './constants/colors';
import React from 'react';

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
  const includesComponent = Array.isArray(classStyles);
  const classArray: String | any[] = includesComponent
    ? classStyles[1].split(' ')
    : classStyles.split(' ');
  let styles = {};
  for (let i = 0; i < classArray.length; i++) {
    let classProp = classArray[i];
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
        ...getStyleValue(classProp, window, allColors),
      };
    }
  }
  const Component = includesComponent ? classStyles[0] : null;
  return includesComponent
    ? (
        props = {
          style: null,
        },
      ) => {
        const {style = {}, ...rest} = props;
        return (
          <Component style={style ? {...styles, ...style} : styles} {...rest} />
        );
      }
    : styles;
};

const useStyler = (stylesClasses?: UserStylerProps) => {
  const window = useWindowDimensions();
  const aditionalColors = useColors();
  const allColors = {
    ...COLORS,
    ...aditionalColors,
  };
  const aditionalProperties = useProperties();
  const allProperties = {
    ...PROPERTIES,
    ...aditionalProperties,
  };
  if (stylesClasses && typeof stylesClasses === 'object') {
    let styles: any = {};
    const stylesClassesArray = Object.entries(stylesClasses);
    for (let i = 0; i < stylesClassesArray.length; i++) {
      const [key, value] = stylesClassesArray[i];
      styles = {
        ...styles,
        [key]: styler(value, window, allColors, allProperties),
      };
    }
    return styles;
  } else if (typeof stylesClasses === 'string') {
    return styler(stylesClasses, window, allColors, allProperties);
  } else {
    return {};
  }
};

export {useStyler, styler};
