import React from "https://esm.sh/react@19.0.0";
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";

export const App = () => {
    //In CDN: function createElement(type, config, children) 

    // 3rd element can be one or more in cdn its mentioned 
    //  var childrenLength = arguments.length - 2;

    // if (childrenLength === 1) {
    //   props.children = children;
    // } else if (childrenLength > 1) {
    //   var childArray = Array(childrenLength);

    //   for (var i = 0; i < childrenLength; i++) {
    //     childArray[i] = arguments[i + 2];
    //   }
    return React.createElement(

        'div',
        {
            className: 'container'
        },
        React.createElement(
            'h1',
            null,
            'Hello, React'
        )
    )
}

const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App)) 
