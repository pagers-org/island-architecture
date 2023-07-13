import ReactDom from "react-dom";
import StyleContext from "isomorphic-style-loader/StyleContext";
import React from "react";
import islandArray from "./island-array";

const insertCss = (...styles) => {
  const removeCss = styles.map((style) => style._insertCss());
  return () => removeCss.forEach((dispose) => dispose());
};

const islands = document.querySelectorAll("[__island]") || [];
const islandProps = JSON.parse(window.ISLAND_PROPS);

console.log("islands", islands, islandProps);

for (let i = 0; i < islands.length; i++) {
  const App = islandArray[i];
  console.log("app", App, App.name);
  setTimeout(() => {
    ReactDom.hydrate(
      <StyleContext.Provider value={{ insertCss }}>
        <App {...islandProps[i]} />
      </StyleContext.Provider>,
      islands[i]
    );
  }, 3000 * (i + 1));
}
