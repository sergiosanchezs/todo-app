// Set up index.html to load the bundle
// import uuidv4 from 'uuid/v4'
import { createTodo, loadTodos } from './todos'
import { setFilters } from './filters'
import { renderTodos } from './views'

// Render initial todos
renderTodos()

// Set up search text handler
document.querySelector('#search-text').addEventListener('input', (e) => {
  setFilters({
    searchText: e.target.value
  })
  renderTodos()
})

// Set up checkbox handler
document.querySelector('#hide-completed').addEventListener('change', (e) => {
  setFilters({
    hideCompleted: e.target.checked
  })
  renderTodos()
})

// Set up form submission handler
document.querySelector('#new-todo').addEventListener('submit', (e) => {
  const text = e.target.elements.newTodo.value.trim()
  e.preventDefault()

  if (text.length > 0) {
    createTodo(text)
    renderTodos()
    e.target.elements.newTodo.value = ''
  }
})

// Watcher for local storage
window.addEventListener('storage', (e) => {
  if (e.key === 'todos') {
    loadTodos()
    renderTodos()
  }
})