import React from 'react';

function ScrollPageButtons({ numOfPages, setCurrentPage, currentPage }) {
	const totalPages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	});

	const nextPage = () => {
		let newPage = currentPage + 1;

		if (newPage > numOfPages) {
			setCurrentPage(1);
		} else {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		let newPage = currentPage - 1;

		if (newPage < 1) {
			setCurrentPage(numOfPages);
		} else {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className={numOfPages === 0 ? 'blank' : 'page-btn-container'}>
			<button className='pageBtn' onClick={prevPage}>
				Prev
			</button>
			{totalPages.map((data, index) => {
				return (
					<button
						type='button'
						key={index}
						className={data === currentPage ? 'pageBtn-active' : 'pageBtn'}
						onClick={() => setCurrentPage(data)}
					>
						{data}
					</button>
				);
			})}
			<button className='pageBtn' onClick={nextPage}>
				Next
			</button>
		</div>
	);
}

export default ScrollPageButtons;
