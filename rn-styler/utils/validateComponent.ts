import React from 'react';

export const isFunctionComponent = (component: React.ReactElement): boolean => {
  return (
    typeof component === 'function' &&
    String(component).includes('return React.createElement')
  );
};

export const isClassComponent = (component: React.ReactElement): boolean => {
  return (
    typeof component === 'function' && !!component.prototype?.isReactComponent
  );
};

export const isComponent = (component: React.ReactElement): boolean => {
  return (
    isFunctionComponent(component) ||
    isClassComponent(component) ||
    typeof component?.render === 'function' ||
    typeof component?.type?.render === 'function'
  );
};
