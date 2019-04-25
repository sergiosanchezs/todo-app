import { getFilters } from "./filters";
import { getTodos, removeTodo, toggleTodo } from "./todos";

// Render application todos based on filters
const renderTodos = () => {
  const todosEl = document.querySelector('#todos')
  const filters = getFilters()
  const todos = getTodos()
  const filteredTodos = todos.filter((todo) => {
    const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    const hideCompletedMatch = !filters.hideCompleted || !todo.completed
    return searchTextMatch && hideCompletedMatch
  })

  const incompleteTodos = filteredTodos.filter(todo => !todo.completed)

  todosEl.innerHTML = ''
  todosEl.appendChild(generateSummaryDOM(incompleteTodos))

  if (filteredTodos.length > 0) {
    filteredTodos.forEach((todo) => {
      todosEl.appendChild(generateTodoDOM(todo))
    })
  } else {
    const messageEl = document.createElement('p')
    messageEl.classList.add('empty-message')
    messageEl.textContent = 'There are no to-dos to show'
    todosEl.appendChild(messageEl)
  }
}

// Get the DOM elements for an individual note
const generateTodoDOM = (todo) => {
  const todoEl = document.createElement('label')
  const containerEL = document.createElement('div')
  const checkbox = document.createElement('input')
  const todoText = document.createElement('span')
  const removeButton = document.createElement('button')

  // Setup todo checkbox
  checkbox.setAttribute('type', 'checkbox')
  checkbox.checked = todo.completed
  containerEL.appendChild(checkbox)
  checkbox.addEventListener('change', (e) => {
    toggleTodo(todo.id)
    renderTodos()
  })

  // Setup the todo text
  todoText.textContent = todo.text
  containerEL.appendChild(todoText)

  // Setup container
  todoEl.classList.add('list-item')
  containerEL.classList.add('list-item__container')
  todoEl.appendChild(containerEL)

  // Setup the remove button
  removeButton.textContent = 'remove'
  removeButton.classList.add('button', 'button--text')
  todoEl.appendChild(removeButton)
  removeButton.addEventListener('click', () => {
    removeTodo(todo.id)
    renderTodos()
  })

  return todoEl
}

// Get the DOM elements for list summary
const generateSummaryDOM = (incompleteTodos) => {
  const summary = document.createElement('h2')
  const plural = incompleteTodos.length === 1 ? '' : 's'
  summary.classList.add('list-title')
  summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
  return summary
}

// Make sure to set up the exports
export { generateTodoDOM, renderTodos, generateSummaryDOM }