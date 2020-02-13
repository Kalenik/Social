import ItemFilter from '@components/ItemFilter';
import ILastMessageItemData from '@interfaces/ILastMessageItemData';
import React, { useEffect, useState } from 'react';

interface ILastMessageListDataFilterProps {
	lastMessageListData: Array<ILastMessageItemData>;
	filteredLastMessageListData: Array<ILastMessageItemData>;
	setFilteredLastMessageListData: React.Dispatch<
		React.SetStateAction<ILastMessageItemData[]>
	>;
}

const LastMessageListDataFilter: React.FC<ILastMessageListDataFilterProps> = ({
	lastMessageListData,
	filteredLastMessageListData,
	setFilteredLastMessageListData
}) => {
	const [filterValue, setFilterValue] = useState('');

	useEffect(() => {
		setFilteredLastMessageListData(
			lastMessageListData.filter(
				({ username }) => username.indexOf(filterValue) !== -1
			)
		);
	}, [filterValue, lastMessageListData]);

	return (
		<>
			<ItemFilter
				setFilterValue={setFilterValue}
				className='last-message-list-data-filter'
				placeholder='Search by User Name...'
			/>

			{filteredLastMessageListData.length < 1 && (
				<div className='last-message-list-data-filter__no-last-message-list-data'>
					No Messages Found
				</div>
			)}
		</>
	);
};

export default LastMessageListDataFilter;
