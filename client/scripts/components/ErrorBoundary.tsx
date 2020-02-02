import React, { ErrorInfo } from 'react';

interface IErrorBoundaryProps {}

export default class ErrorBoundary extends React.Component {
	state: {
		hasError: boolean;
	};

	constructor(props: IErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(_error: Error) {
		return { hasError: true };
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.log(error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className='error-boundary'>
					<h1 className='error-boundary__message'>
						Something went wrong. Try to refresh page.
					</h1>
				</div>
			);
		}

		return this.props.children;
	}
}
