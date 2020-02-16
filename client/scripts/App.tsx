import BackToTopButton from '@components/Buttons/BackToTopButton';
import ErrorBoundary from '@components/ErrorBoundary';
import MessageNoticeList from '@components/Messages/MessageNoticeList/MessageNoticeList';
import SocketContextProvider from '@contexts/contextProviders/SocketContextProvider';
import React from 'react';
import Main from './components/Main';
import Navbar from './components/Navbar/Navbar';
import AuthContextProvider from './contexts/contextProviders/AuthContextProvider';
import LoadingContextProvider from './contexts/contextProviders/LoadingContextProvider';
import NoticeContextProvider from './contexts/contextProviders/NoticeContextProvider/NoticeContextProvider';

const App: React.FC = () => (
	<div className='container'>
		<NoticeContextProvider>
			<LoadingContextProvider>
				<AuthContextProvider>
					<SocketContextProvider>
						<ErrorBoundary>
							<Navbar />
							<div className='content'>
								<Main />
							</div>
							<MessageNoticeList />
						</ErrorBoundary>
					</SocketContextProvider>
				</AuthContextProvider>
			</LoadingContextProvider>
		</NoticeContextProvider>

		<BackToTopButton />
	</div>
);

export default App;
