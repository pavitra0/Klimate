import { Component } from "react";

class ErrorBoundary extends Component {
  //@ts-ignore
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }
//@ts-ignore
  componentDidCatch(error, errorInfo) {
    console.error("Error caught in boundary:", error, errorInfo);
  }

  render() {
    //@ts-ignore
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }
//@ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;