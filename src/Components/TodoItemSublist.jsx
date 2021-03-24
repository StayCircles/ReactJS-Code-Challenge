import React from 'react';

import { connect } from "react-redux";
import { setCurrentSubListKey, setTodoList } from '.././store/action/index';
import { Link } from "react-router-dom";

import styled from 'styled-components';

const TodoItem = (props) => (
    
    <Wrapper>
        <code>
            [{props.completed ? 'x' : '  '}] <Text onClick={props.onComplete}>{props.title}</Text>
    </code>
    </Wrapper>
)

const Wrapper = styled.p`
  font-size: 24px;
  cursor: pointer;
`

const Links = styled.span`
  font-size: 24px;
  cursor: pointer;
  margin-left:10px;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
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
export default connect(mapStateToProps, mapDispatchToProp)(TodoItem);
