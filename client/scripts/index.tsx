import 'core-js/features/array/find';
import 'core-js/features/promise';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'whatwg-fetch';
import '../favicon.ico';
import '../styles/main.less';
import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	window.document.getElementById('root')
);
