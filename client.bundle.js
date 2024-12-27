/**
 * Import the Hello component and use webpack to bundle the code
 */
// const Hello = require('./HelloComponent');

/**
 * For simplicity I am just defining the same component again
 */
const Hello = () => {
  return React.createElement(
    "div",
    null,
    React.createElement("h1", null, "Hello"),
    React.createElement(
      "button",
      { id: "myButton", onClick: () => console.log("button clicked") },
      "Click me"
    )
  );
};

// Function to execute when DOM is fully loaded
function initialize() {
  // Hydrate the server-rendered markup
  ReactDOM.hydrate(React.createElement(Hello), document.getElementById("app"));
}

// Wait for DOMContentLoaded event to ensure DOM is fully loaded
document.addEventListener("DOMContentLoaded", initialize);

/*

    The ReactDOM.hydrate method is used in React applications for server-side rendering (SSR). It attaches event listeners and reuses the server-rendered HTML markup, making the page interactive without re-rendering the entire HTML from scratch.



    Key Features: 
    
   1. Hydration: Unlike ReactDOM.render, which generates a new DOM tree, hydrate works by attaching React's event handlers to the pre-rendered HTML generated by the server. It assumes the HTML content in the container matches the React elements.


   2. Performance Optimization: By reusing the existing DOM, it avoids unnecessary reflows and repaints, improving the loading performance of SSR applications.

   3.Warning for Mismatches: If the server-rendered HTML does not match what React expects, it logs a warning in the console and updates the DOM to match React's virtual DOM.



*/