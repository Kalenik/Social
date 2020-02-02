import Spinner from '@components/Spinner';
import LoadingContext from '@contexts/loadingContext';
import React, { useState } from 'react';

interface ILoadingContextProvider {
	children?: React.ReactNode;
}

const LoadingContextProvider: React.FC<ILoadingContextProvider> = ({
	children
}) => {
	const [isLoading, setLoading] = useState<boolean>(false);

	return (
		<LoadingContext.Provider value={setLoading}>
			{isLoading && <Spinner />}
			{children}
		</LoadingContext.Provider>
	);
};

export default LoadingContextProvider;
