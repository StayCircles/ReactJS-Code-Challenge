import React from 'react'

import styled from 'styled-components'

const TodoItem = ({ text, completed, onComplete }) => (
  <Wrapper onClick={onComplete}>
    <code>
      [{completed ? 'x' : '  '}] <Text completed={completed}>{text}</Text>
    </code>
  </Wrapper>
)

const Wrapper = styled.p`
  font-size: 24px;
  cursor: pointer;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

export default TodoItem
