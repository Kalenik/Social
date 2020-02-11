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
					<div className='error-boundary__message'>
						<p>Something went wrong.</p>
						<p>Try to refresh page.</p>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}
