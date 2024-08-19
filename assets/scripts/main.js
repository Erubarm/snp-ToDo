const addButton = document.getElementById('buttonAddTask')
const inputText = document.getElementById('inputText')

function addTask() {
	let taskText = inputText.value.trim()

	if (taskText === '') {
		return
	}

	const newTask = document.createElement('li')
	newTask.classList.add('todo-item')
	newTask.innerHTML = `
        <label class="todo-item__block-text-radio">
            <input type="checkbox" />
            <span class="custom-radio"></span>
            <p>${taskText}</p>
        </label>

        <button class="todo-item__cross">
            <img src="./assets/icons/cross.svg" alt="cross" />
        </button>
    `

	todoList.appendChild(newTask)

	const textTask = newTask.querySelector('label p')
	textTask.addEventListener('dblclick', () => {
		const currentText = textTask.innerText
		const input = document.createElement('input')

		input.type = 'text'
		input.value = currentText
		input.className = 'edit-input'

		textTask.replaceWith(input)
		input.focus()

		input.addEventListener('keydown', event => {
			if (event.key === 'Enter') {
				textTask.innerText = input.value
				input.replaceWith(textTask)
			}
		})

		input.addEventListener('blur', () => {
			textTask.innerText = input.value
			input.replaceWith(textTask)
		})
	})

	const checkbox = newTask.querySelector('input[type="checkbox"]')
	checkbox.addEventListener('change', () => {
		updateActiveTodoCount()
		applyFilter(currentFilter)
	})

	const deleteCross = newTask.querySelector('.todo-item__cross')
	deleteCross.addEventListener('click', () => {
		newTask.remove()
		liItems = document.querySelectorAll('.todo-item')
		updateActiveTodoCount()
		updateListDisplay()
	})

	liItems = document.querySelectorAll('.todo-item')
	updateActiveTodoCount()
	updateListDisplay()

	inputText.value = ''
}

function updateListDisplay() {
	if (todoList.children.length > 0) {
		todoList.classList.add('has-items')
	} else {
		todoList.classList.remove('has-items')
	}
}

addButton.addEventListener('click', addTask)

inputText.addEventListener('keypress', event => {
	if (event.key === 'Enter') {
		addTask()
	}
})
