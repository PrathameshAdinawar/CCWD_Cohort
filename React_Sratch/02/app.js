import React from "https://esm.sh/react@19.0.0";
import ReactDOM from "https://esm.sh/react-dom@19.0.0/client";

// React components with props
// earlier was know as dump component
const Chai = (props) => {
    return React.createElement(
        'div',
        {},
        [
            React.createElement('h1', {}, props.name || 'No Chai'),
            React.createElement('p', {}, props.desc || 'kuch bhi ')
        ]
    )
}

const App = () => {
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
        [
            React.createElement("h1", null, 'Hello, React'),
            React.createElement(Chai, {
                name: 'Masala Chai',
                desc: 'React Component with props'
            })
        ]
    )
}
//picking the id where we want to display the content
const container = document.getElementById('root')
//to create a root and render the element
const root = ReactDOM.createRoot(container)
root.render(React.createElement(App)) 
