import BackToTopButton from '@components/Buttons/BackToTopButton';
import ErrorBoundary from '@components/ErrorBoundary';
import MessageContextProvider from '@contexts/contextProviders/MessageContextProvider';
import SocketContextProvider from '@contexts/contextProviders/SocketContextProvider';
import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar/Navbar';
import AuthContextProvider from './contexts/contextProviders/AuthContextProvider';
import LoadingContextProvider from './contexts/contextProviders/LoadingContextProvider';
import NoticeContextProvider from './contexts/contextProviders/NoticeContextProvider/NoticeContextProvider';

const App: React.FC = () => (
	<div className='container'>
		<ErrorBoundary>
			<NoticeContextProvider>
				<LoadingContextProvider>
					<AuthContextProvider>
						<SocketContextProvider>
							<MessageContextProvider>
								<Navbar />
								<div className='content'>
									<Main />
								</div>
							</MessageContextProvider>
						</SocketContextProvider>
					</AuthContextProvider>
				</LoadingContextProvider>
			</NoticeContextProvider>

			<BackToTopButton />
		</ErrorBoundary>
	</div>
);

export default App;
