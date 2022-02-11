import React from 'react';
import { Chip } from '@material-ui/core';

const previewChips = (props) => {
	const { chipsList } = props;

	return (
		<>
			{chipsList.map(
				(item, i) =>
					item?.chips?.length > 0 && (
						<div key={i} style={{ marginBottom: '20px' }}>
							<h3 style={{ textAlign: 'center' }}>{item.title}</h3>
							<div className='preview-card'>
								{item.chips.map((chip, idx) => (
									<Chip
										key={idx}
										style={{ color: '#596275', margin: '5px 5px' }}
										variant='outlined'
										label={chip.value}
										onDelete={() => item.onDelete(chip)}
									/>
								))}
							</div>
						</div>
					)
			)}
		</>
	);
};

export default previewChips;
