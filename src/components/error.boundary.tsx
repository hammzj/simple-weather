import React from "react";

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error
}


export default class ErrorBoundary extends React.Component<any, Readonly<ErrorBoundaryState>> {
    constructor(props) {
        super(props);
        this.state = {hasError: false, error: undefined};
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true, error: error};
    }

    componentDidCatch(error, info) {
        this.setState(ErrorBoundary.getDerivedStateFromError(error));
        console.error(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return this.props.fallback;
        }
        return this.props.children;
    }
}

