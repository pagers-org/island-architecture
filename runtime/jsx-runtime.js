import * as jsxRuntime from "react/jsx-runtime";

const originJsx = jsxRuntime.jsx;
const originJsxs = jsxRuntime.jsxs;

const internalJsx = (jsx, type, props, ...args) => {
  if (props && props.__island) {
    data.islandProps.push(props);

    // TODO: According to the type, locate which component this props should be injected into.
    console.log('type',type,props,...args)
    const id = type.name;

    delete props.__island;
    return jsx("div", {
      __island: `${id}:${data.islandProps.length - 1}`,
      children: jsx(type, props, ...args),
    });
  }

  return jsx(type, props, ...args);
};


export const jsx = (...args) => internalJsx(originJsx, ...args);

export const jsxs = (...args) => internalJsx(originJsxs, ...args);

export const Fragment = jsxRuntime.Fragment;

// collect props in renderToString
export const data = {
  islandProps: [],
};

export const clearIslandData = () => {
  data.islandProps = [];
};
