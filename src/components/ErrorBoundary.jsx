import React, { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Log error to monitoring service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card p-6 border border-red-500 bg-red-900/20 text-center">
          <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" aria-hidden="true" />
          
          <h2 className="text-xl font-semibold text-red-300 mb-2">Something went wrong</h2>
          
          <p className="text-red-300/80 mb-6">
            We encountered an error while rendering this component.
          </p>
          
          {this.props.showDetails && this.state.error && (
            <div className="bg-red-950/50 p-4 rounded-md mb-6 text-left overflow-auto max-h-40 text-sm">
              <p className="text-red-300 font-mono">{this.state.error.toString()}</p>
            </div>
          )}
          
          <button
            onClick={this.handleReset}
            className="inline-flex items-center px-4 py-2 bg-red-500/30 hover:bg-red-500/40 text-red-200 rounded-md transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

