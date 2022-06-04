import React, {createContext, useContext} from 'react';
import {colors} from '../constants/colors';
import {styleProperties} from '../styles/index';

type ThemeProviderProps = {
  theme?: ThemeType | any;
  children: JSX.Element;
};

type ThemeType = {
  colors?: any;
  properties?: any;
};

const DEFAULT_THEME = {
  colors,
  properties: styleProperties,
};

export const ThemeContext = createContext(DEFAULT_THEME);

export const ThemeProvider = ({theme = {}, children}: ThemeProviderProps) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useColors = () => {
  const {colors} = useContext(ThemeContext);
  return colors;
};

export const useProperties = () => {
  const {properties} = useContext(ThemeContext);
  return properties;
};
