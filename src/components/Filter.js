import React from 'react';
import styled from 'styled-components';

const Filter = (props) => {
  return (
    <div>
      <Input type="checkbox" onClick={props.onFilterSelect}/>
      <Span>{props.filterData.textLabel}</Span>
    </div>
  );
}

const Input = styled.input`
  width: 20px;
  height: 20px
`;
const Span = styled.span`
  color: black;
`;
export default Filter;