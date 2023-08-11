import{jsx as _jsx}from"react/jsx-runtime";import{Component}from"react";export class ErrorBoundary extends Component{state={hasError:!1};static getDerivedStateFromError(){return{hasError:!0}}componentDidCatch(error,errorInfo){if(process.env.NODE_ENV!=="test")console.error("Uncaught error:",error,errorInfo);else throw error}render(){return this.state.hasError?_jsx("h1",{children:"Sorry.. there was an error, check the console."}):this.props.children}}export default ErrorBoundary;