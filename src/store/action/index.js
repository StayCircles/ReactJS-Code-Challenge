const setTodoList = (data) => {
      console.log("kuch dekhta hai kaka==>",data)
      return (dispatch) => {
          dispatch({ type: "SETTODOLIST", data: data })
      }
}

const setCurrentSubListKey =(key) =>{
    console.log("The selected category is : ",key)
    return (dispatch)=>{
        dispatch({type:"SETCURRENTSUBLISTKEY",data:key})
    }
}

export {
    setTodoList,
    setCurrentSubListKey
}