import onInputChangeDebounce from '@utils/onInputChangeDebounce';
import React from 'react';

interface IItemFilter {
	setFilterValue: React.Dispatch<React.SetStateAction<string>>;
	className?: string;
	placeholder?: string;
}

const ItemFilter: React.FC<IItemFilter> = ({
	setFilterValue,
	className,
	placeholder
}) => {
	const onChangeHandler = onInputChangeDebounce(
		(e: React.ChangeEvent<HTMLInputElement>): void =>
			setFilterValue(e.target.value),
		400
	);

	return (
		<input
			placeholder={placeholder || 'Search...'}
			onChange={onChangeHandler}
			className={className ? `item-filter ${className}` : 'item-filter'}
		/>
	);
};

export default ItemFilter;
