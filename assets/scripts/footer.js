const buttons = document
	.querySelector('.block-filter-buttons')
	.querySelectorAll('button')

const countTodo = document.getElementById('counterTodos')
let todoList = document.querySelector('.todo-list')
let liItems = document.querySelectorAll('.todo-item')
const buttonShowAllList = document.getElementById('showAllList')
const buttonShowActiveTodo = document.getElementById('showActiveTodos')
const buttonShowCompletedTodos = document.getElementById('showCompletedTodos')
const buttonClearCompletedTodosAll = document.getElementById(
	'buttonClearCompletedAll'
)
const buttonsCrossDelete = document.querySelectorAll('.todo-item__cross')

function updateActiveTodoCount() {
	const countActiveTodos = Array.from(liItems).filter(
		item => !item.querySelector('label input').checked
	).length
	countTodo.innerHTML = `${countActiveTodos} задачи не выполнено`
}

let currentFilter = 'all'
updateActiveTodoCount()

function applyFilter(filter) {
	liItems.forEach(item => {
		const isChecked = item.querySelector('label input').checked
		switch (filter) {
			case 'all':
				item.style.display = 'flex'
				break
			case 'active':
				item.style.display = isChecked ? 'none' : 'flex'
				break
			case 'completed':
				item.style.display = isChecked ? 'flex' : 'none'
				break
		}
	})
}

function clearCompletedTodos() {
	liItems.forEach(item => {
		const isChecked = document.querySelector('label input').checked
		if (isChecked) item.remove()
	})

	liItems = document.querySelectorAll('.todo-item')
	updateActiveTodoCount()
}

liItems.forEach(item => {
	const checkbox = item.querySelector('label input')
	checkbox.addEventListener('change', () => {
		updateActiveTodoCount()
		applyFilter(currentFilter)
	})
})

buttonShowAllList.addEventListener('click', () => {
	currentFilter = 'all'
	applyFilter(currentFilter)
})

buttonShowActiveTodo.addEventListener('click', () => {
	currentFilter = 'active'
	applyFilter(currentFilter)
})

buttonShowCompletedTodos.addEventListener('click', () => {
	currentFilter = 'completed'
	applyFilter(currentFilter)
})

buttonClearCompletedTodosAll.addEventListener('click', () => {
	clearCompletedTodos()
})

buttonsCrossDelete.forEach(button => {
	button.addEventListener('click', () => {
		const todoItem = button.closest('.todo-item')
		todoItem.remove()

		liItems = document.querySelectorAll('.todo-item')
		updateActiveTodoCount()
	})
})

buttons.forEach(item => {
	item.addEventListener('click', () => {
		buttons.forEach(element => {
			element.classList.remove('filter-button__focus')
		})
		item.classList.add('filter-button__focus')
	})
})
