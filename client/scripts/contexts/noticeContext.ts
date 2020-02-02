import { noticesReducerActionType } from '@reducers/NoticesReducer/NoticesReducer';
import { createContext } from 'react';

export default createContext<React.Dispatch<noticesReducerActionType>>(
	() => {}
);
