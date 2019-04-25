import uuidv4 from 'uuid/v4'

// Setup the empty todos array
let todos = []

const loadTodos = () => {
  const todosJSON = localStorage.getItem('todos')
  try {
    todos = todosJSON ? JSON.parse(todosJSON) : []
    // return todosJSON ? JSON.parse(todosJSON) : []
  } catch (e) {
    todos = []
    // return []
  }
}

const saveTodos = () => {
  localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos
// const getTodos = () => todos = loadTodos()

const createTodo = (text) => {
    todos.push({
      id: uuidv4(),   // if property have the same name of the variable ES6 shorthand definition
      text, // if property have the same name of the variable ES6 shorthand definition
      completed: false
    })
    saveTodos()
}

// Remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex(todo => todo.id === id)

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1)
    saveTodos()
  }

}

// Toggle the completed value for a given todo
const toggleTodo = (id) => {
  const todo = todos.find(todo => todo.id === id)

  if (todo) {
    todo.completed = !todo.completed
    saveTodos()
  }
}

loadTodos()

export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo }