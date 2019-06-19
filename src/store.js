import { Container } from 'unstated'

const defaultState = {
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
  ],
  filterOption:  [{
    id: 1,
    textLabel: 'All'
  },{
    id: 2,
    textLabel: 'Complete'
  },{
    id: 3,
    textLabel: 'Incomplete'
  }],
  activeFilterId: 1
}

class TodosContainer extends Container {
  constructor (props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList () {
    return this.state.list
  }

  getOptions () {
    return this.state.filterOption;
  }

  toggleComplete = async id => {
    const item = this.state.list.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      return { list }
    })

    this.syncStorage()
  }

  createTodo = async text => {
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: state.list.length + 1
      }

      const list = state.list.concat(item)
      return { list }
    })

    this.syncStorage()
  }

  setFilter = async id => {
    await this.setState({activeFilterId: id});
    this.updateTodoList();
  }
  updateTodoList () {
    let list = [];
    let activeFilterId = this.state.activeFilterId;
    this.state.list.forEach((todo)=> {
      if(activeFilterId === 2 && todo.completed){
        list.push(todo);
      } else if(activeFilterId === 3 && !todo.completed){
        list.push(todo);
      }
    });
    this.setState({list});
  }
  // getActiveFilterId = ()=> {
  //   return this.state.activeFilterId;
  // }
}
  
export default TodosContainer
