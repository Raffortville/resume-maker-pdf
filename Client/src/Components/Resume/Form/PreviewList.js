import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Button } from '@material-ui/core';

const PreviewList = (props) => {
	const { itemsList } = props;

	return (
		<>
			{itemsList.map(
				(item, index) =>
					item?.achievements?.length > 0 && (
						<div key={index} style={{ marginBottom: '20px' }}>
							<h3 style={{ textAlign: 'center' }}>{item.title}</h3>
							<ul>
								{item.achievements.map((achievement, i) => (
									<li
										key={i}
										style={{
											display: 'flex',
											alignItems: 'start',
											justifyContent: 'space-between',
											marginBottom: '10px',
											width: '100%',
										}}>
										{achievement.value}
										<Button onClick={() => item.onDelete(achievement)}>
											<HighlightOffIcon />
										</Button>
									</li>
								))}
							</ul>
						</div>
					)
			)}
		</>
	);
};

export default PreviewList;
