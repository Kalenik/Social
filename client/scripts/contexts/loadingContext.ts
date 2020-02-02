import { createContext } from 'react';

export default createContext<React.Dispatch<React.SetStateAction<boolean>>>(
	() => {}
);
