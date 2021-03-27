import React, { useState } from 'react';

import { connect } from "react-redux";

import { setTodoList } from '.././store/action/index';

import TodoList from "./TodoList";

import styled from 'styled-components'
import '../Styling/Home.css';

const Home = (props) => {

    ///////////////////////////////////////////////////////////////////////////////////////////////////

    const [at, setAt] = useState([]);

    const [defaultList, setdefaultList] = useState(true);

    console.log(props.list[0])

    const activeTasks = (e) => {
        setdefaultList(false);
        if (e == "active") {
            var sm = [];
            for (let i = 0; i < props.list.length; i++) {
                console.log("i ==> ", props.list[i]);

                if (props.list[i].completed == false) {
                    console.log("AAho==> ,", props.list[i].completed);
                    let obj = {
                        id: props.list[i].id,
                        completed: props.list[i].completed,
                        title: props.list[i].title
                    }
                    sm.push(obj);
                }
            }
            console.log("VALUE", sm)
            setAt(sm);
        }
        else if (e == "complete") {
            var sm = [];
            for (let i = 0; i < props.list.length; i++) {
                console.log("i ==> ", props.list[i]);

                if (props.list[i].completed == true) {
                    console.log("AAho==> ,", props.list[i].completed);
                    let obj = {
                        id: props.list[i].id,
                        completed: props.list[i].completed,
                        text: props.list[i].text
                    }
                    sm.push(obj);
                }
            }
            console.log("VALUE", sm)
            setAt(sm);
        }
        else if (e == "all") {
            setAt(props.list);
        }

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////

    const handleKeyPress = e => {
        setdefaultList(true);
        if (e.key === 'Enter') {

            const item = {
                completed: false,
                title: e.target.value,
                id: props.list.length + 1,
                Sublist: [
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
                    }]
            }

            // const list = props.list.concat(item)

            const previous_list = props.list;
            const list = [...previous_list, item];

            props.setTodoList(list)

            console.log("LIST==>", props.list);

            //            alert(e.target.value);
        }
    }
    return (
        <Wrapper>
            <TodosWrapper>
                <div>
                    <Input
                        type='text'
                        onKeyPress={handleKeyPress}
                        placeholder='Add new todo...'
                    />
                </div>

                <div style={{ display: "flex" }}>
                    <button className="btn" onClick={() => activeTasks("active")}>Active</button>
                    <button className="btn" onClick={() => activeTasks("complete")}>Completed</button>
                    <button className="btn" onClick={() => activeTasks("all")}>All</button>
                </div>

                {(defaultList) ? (
                    <TodoList items={props.list} data={props.list} />
                ) : (
                    <TodoList items={at} data={at} />
                )}

            </TodosWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 24px;
  height: 40px;
  width: 500px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`
const mapStateToProps = (state) => ({
    list: state.app.SETTODOLIST,
})

//updating the data of the state
const mapDispatchToProp = (dispatch) => ({
    setTodoList: (data) => dispatch(setTodoList(data)),
})
//updating the data of the state
export default connect(mapStateToProps, mapDispatchToProp)(Home);