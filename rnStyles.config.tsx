type Prefixes = any;

const mediaQueriesPrefixes = {
    sm: 320,
    md: 480,
    lg: 769,
    xl: 1025,
    xxl: 1201,
};

export const prefixes: Prefixes = {
    ...mediaQueriesPrefixes,
};