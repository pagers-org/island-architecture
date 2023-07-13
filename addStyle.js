export const STYLE_MAP = {};

export const getStyle = id => STYLE_MAP[id];

export default cssSets => (...styles) => styles.forEach(style => {
    if (!style._getContent || !style._getCss) {
        return;
    }
    const moduleId = 's' + style._getContent()[0][0] + '-0';

    if (!STYLE_MAP.hasOwnProperty(moduleId)) {
        STYLE_MAP[moduleId] = {
            id: moduleId,
            content: style._getCss()
        };
    }
    cssSets[moduleId] = 1;
});
