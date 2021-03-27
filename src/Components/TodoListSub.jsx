import React from 'react'

import styled from 'styled-components'

import { connect } from "react-redux";
import { setCurrentSubListKey, setTodoList } from '.././store/action/index';

import TodoItemSublist from './TodoItemSublist';

const TodoListSub = (props) => (
    <Wrapper>
        {props.list[props.currentSublistKey].Sublist.map(item => {
            const onComplete = e => {
                var SubVal = {};
                SubVal = {
                    id: e,
                    completed: !item.completed,
                    text: item.text
                }
                var val = {};
                props.list[props.currentSublistKey].Sublist[e-1]=SubVal;
                if (item.id === e) {
                    val = {
                        completed: props.list[props.currentSublistKey].completed,
                        id: props.list[props.currentSublistKey].id,
                        title: props.list[props.currentSublistKey].title,
                        Sublist: props.list[props.currentSublistKey].Sublist
                    }
                }

                props.list[props.currentSublistKey] = (val)
                const previous_list = props.list;
                const list = [...previous_list];

                props.setTodoList(list)
                console.log("LIST HERE IS==) ", props.list);
            }

            return <TodoItemSublist id={item.id} key={item.id} data={props.data} completed={item.completed} title={item.text} onComplete={() => onComplete(item.id)} />
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
export default connect(mapStateToProps, mapDispatchToProp)(TodoListSub);
