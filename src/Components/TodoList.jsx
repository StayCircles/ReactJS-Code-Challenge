import React from 'react'
// var val = {};
//                 val = {
//                     completed: item.completed,
//                     id: item.id,
//                     title: item.title,
//                     Sublist: [
                        // {
                        //     id: e,
                        //     completed: !item[props.currentSublistKey-1].completed,
                        //     text: item[props.currentSublistKey-1].text
                        // }
//                     ]
//                 }
import styled from 'styled-components'

import { connect } from "react-redux";
import { setCurrentSubListKey, setTodoList } from '.././store/action/index';

import TodoItem from './TodoItem'

const TodoList = (props) => (
    <Wrapper>
        {props.items.map(item => {
            const onComplete = e => {

                var val = {};

                val = {
                    completed: !item.completed,
                    id: e,
                    title: item.title,
                    Sublist: item.Sublist
                }

                props.list[e - 1] = (val)
                const previous_list = props.list;
                const list = [...previous_list];

                props.setTodoList(list)
                console.log("LIST HERE IS==) ", props.list);
            }

            return <TodoItem id={item.id} key={item.id} data={props.data} completed={item.completed} title={item.title} onComplete={() => onComplete(item.id)} />
        })}
    </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const mapStateToProps = (state) => ({
    currentSublistKey: state.app.SETCURRENTSUBLISTKEY,
    list: state.app.SETTODOLIST,
})

//updating the data of the state
const mapDispatchToProp = (dispatch) => ({
    setCurrentSubListKey: (data) => dispatch(setCurrentSubListKey(data)),
    setTodoList: (data) => dispatch(setTodoList(data)),
})
//updating the data of the state
export default connect(mapStateToProps, mapDispatchToProp)(TodoList);
