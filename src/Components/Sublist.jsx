import React,{useState} from 'react';

import { connect } from "react-redux";

import { setTodoList } from '.././store/action/index';

import {Link} from "react-router-dom"

import TodoListSub from "./TodoListSub";

import styled from 'styled-components'
import '../Styling/Home.css';

const Sublist = (props) => {
   
    const handleKeyPress = e => {
        var txt=e.target.value;
        if (e.key === 'Enter') {
            var previousSublist=props.list[props.currentSublistKey].Sublist;
            const item = {
                completed: props.list[props.currentSublistKey].completed,
                title: props.list[props.currentSublistKey].title,
                id: props.list[props.currentSublistKey].id,
                Sublist: [
                    ...previousSublist,
                    {
                        id: props.list[props.currentSublistKey].Sublist.length + 1,
                        completed: false,
                        text: txt
                    }]
            }

            props.list[props.currentSublistKey]=item;

            const previous_list = props.list;
            const list = [...previous_list];

            props.setTodoList(list)

            console.log("LIST==>", props.list);

        }
    }
    return (
        <Wrapper>
            <TodosWrapper>
                <div>
                    <Link className="back" to="/">Go Back</Link> <h2>This is Sublist of "{props.list[props.currentSublistKey].title}"</h2>
                    <Input
                        type='text'
                        onKeyPress={handleKeyPress}
                        placeholder='Add new todo...'
                    />
                </div>

                <TodoListSub items={props.list[props.currentSublistKey]} data={props.list[props.currentSublistKey]} />

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
    currentSublistKey: state.app.SETCURRENTSUBLISTKEY,
})

//updating the data of the state
const mapDispatchToProp = (dispatch) => ({
    setTodoList: (data) => dispatch(setTodoList(data)),
})
//updating the data of the state
export default connect(mapStateToProps, mapDispatchToProp)(Sublist);