import stylePrefixes from './prefixes';

export const getStyleValue = (classProp: String, window: any, colors: any) => {
  const splittedClassProp = classProp.split('-');
  let keyProp = '',
    value: string | number = '';
  if (
    splittedClassProp.length > 2 &&
    colors[
      `${splittedClassProp[splittedClassProp.length - 2]}-${
        splittedClassProp[splittedClassProp.length - 1]
      }`
    ]
  ) {
    splittedClassProp.forEach((el, index) => {
      if (index >= splittedClassProp.length - 2 && !value) {
        value =
          colors[
            `${splittedClassProp[splittedClassProp.length - 2]}-${
              splittedClassProp[splittedClassProp.length - 1]
            }`
          ];
      } else if (index < splittedClassProp.length - 2) {
        keyProp += index === 0 ? el : '-' + el;
      }
    });
  } else if(
    splittedClassProp.length === 2 &&
      colors[splittedClassProp[splittedClassProp.length - 1]]
  ){
    keyProp = splittedClassProp[0];
    value = colors[splittedClassProp[splittedClassProp.length - 1]];
  } else {
    splittedClassProp.forEach((el, index) => {
      if (index === splittedClassProp.length - 1) {
        if(el.includes('(') && el.includes(')')){
          const { height, width } = window;
          const numberValue = Number(el.replace('wp(', '').replace('hp(', '').replace(')', ''));
          value = el.startsWith('w') ? width * (numberValue/100) : height * (numberValue/100);
        }else if (
          typeof Number(el) === 'number' &&
          !el.includes('%') &&
          !el.includes('#') &&
          // Probably bug, white or black values should'nt pass this if
          el !== 'white' &&
          el !== 'black' &&
          el !== 'auto'
        ) {
          // In some cases, value needs to be a number
          value = Number(el);
        } else {
          value = el;
        }
        value = colors[value] ? colors[value] : value;
      } else {
        keyProp += index === 0 ? el : '-' + el;
      }
    });
  }
  const property = stylePrefixes[keyProp];
  let properties = {};
  if(Array.isArray(property)){
    for(let i=0;i<property.length;i++){
      properties = { ...properties, [property[i]]: value };
    }
  }
  return [property]
    ? typeof property === "string" ? {
        [property]: value,
    } : Array.isArray(property) ? 
      properties : {}
    : {};
};
