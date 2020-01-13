import React from 'react';
import { Button } from 'semantic-ui-react';

class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    logError = (error, info) => {
        this.setState({ error: error });
        console.log(error);
        console.log(info);
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true });
        this.logError(error, info);
    }

    clearCache = () => {
        delete localStorage['matrixwebportalstate'];
        window.location.href = '/';
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 50 }}>
                    <h1>Error</h1>
                    <h4>{this.state.error.message}</h4>
                    <Button primary style={{ marginTop: 30 }} onClick={this.clearCache}>Clear Cache</Button>
                </div>
            );
        }
        return this.props.children;
    }
}


export default ErrorBoundary;