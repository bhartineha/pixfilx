import React from 'react';

const AddFavourites = () => {
	return (
		<>
			<div className="star_cls">
			<div class="starOff">
			<svg xmlns="http://www.w3.org/2000/svg" fill='#FFCA28' version="1.1">
				<polygon points="12,3 6,21 21,9 3,9 18,21" />
			</svg>
			</div>
			<span className='tooltiptext mr-2'>Add to Favourites</span> 
			</div>
			
		</>
	);
};

export default AddFavourites;
