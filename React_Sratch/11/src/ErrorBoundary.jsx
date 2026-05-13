// react-error-boundary is a package which is used intead of this big code we use that package to handle error in react components. It provides a simple and efficient way to catch and handle errors in React applications, allowing developers to create a better user experience by displaying fallback UI when an error occurs. The package includes a component called ErrorBoundary that can be used to wrap any part of the application where you want to catch errors. When an error is thrown within the wrapped component, the ErrorBoundary will catch it and render a fallback UI instead of crashing the entire application. This helps to improve the stability and reliability of React applications by preventing unhandled errors from causing crashes.

import { Component } from "react";

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        }
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log("Error:", error);
        console.log("Error Info:", errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                    <p>{this.state.error.message}</p>
                </div>
            )
        }

        return this.props.children;
    }


}
