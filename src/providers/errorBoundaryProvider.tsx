'use client'
import { Component } from "react";

type ErrorState = {
    hasError: boolean
}
class ErrorBoundaryProvider extends Component {
    pageProps: any;
    constructor(props: any) {
        super(props)
        this.pageProps = props;
        // Define a state variable to track whether is an error or not
        this.state = { hasError: false, error: null }
    }
    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI
        return { hasError: true, error }
    }
    componentDidCatch(error: any, errorInfo: any) {
        // You can use your own error logging service here
        console.log({ error, errorInfo })
        this.setState({ ...this.state, error, errorInfo })
    }
    render() {
        // Check if the error is thrown
        const { hasError, error }: any = this.state;
        if (hasError) {
            // You can render any custom fallback UI
            return (
                <div>
                    <h2>Oops, there is an error!</h2>
                    <div>
                        {JSON.stringify(error.message)}
                        <br />
                        for more details go to console
                    </div>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Try again?
                    </button>
                </div>
            )
        }

        // Return children components in case of no error

        return this.pageProps.children
    }
}

export default ErrorBoundaryProvider