import { useEffect, useReducer } from 'react'

const initialState = {
  list: [
    {
      id: 1,
      completed: false,
      text: 'Read README'
    },
    {
      id: 2,
      completed: false,
      text: 'Add one todo'
    },
    {
      id: 3,
      completed: false,
      text: 'Add filters'
    },
    {
      id: 4,
      completed: false,
      text: 'Add multiple lists'
    },
    {
      id: 5,
      completed: false,
      text: 'Optional: add tests'
    }
  ]
}

function syncStorage (state) {
  if (window && window.localStorage) {
    window.localStorage.setItem('appState', JSON.stringify(state))
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'read_storage':
      if (window && window.localStorage) {
        const state = window.localStorage.getItem('appState')
        if (state && state !== 'undefined') {
          return JSON.parse(state)
        }
      }

      return initialState

    case 'toggle_complete':
        const { id } = action

        return {
          list: state.list.map(item => {
            if (item.id === id) {
              return {
                ...item,
                completed: !item.completed
              }
            }

            return item
          })
        }
    case 'create_todo':
      const { text } = action
      const item = {
        completed: false,
        text,
        id: state.list.length + 1
      }

      const list = state.list.concat(item)
      return { list }

    default:
      throw new Error('Unknown type: ' + action.type);
  }
}

function useTodos() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { list } = state

  useEffect(() => {
    dispatch({type: 'read_storage' })
  }, [dispatch])

  useEffect(() => {
    syncStorage({ list })
  }, [list])

  const createTodo = (text) => dispatch({ type: 'create_todo', text })
  const toggleComplete = (id) => dispatch({ type: 'toggle_complete', id })

  return { list, createTodo, toggleComplete }
}

export default useTodos