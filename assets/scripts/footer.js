const buttons = document
	.querySelector('.block-filter-buttons')
	.querySelectorAll('button')

buttons.forEach(item => {
	item.addEventListener('click', () => {
		buttons.forEach(element => {
			element.classList.remove('filter-button__focus')
		})
		item.classList.add('filter-button__focus')
	})
})
