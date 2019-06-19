import React from 'react';
import styled from 'styled-components';
import Filter from './Filter';
const FilterTodos = (props) => {
  return (
    <FilterContainer>
      {
        props.options.map((filter, index)=> {
          const filterClicked = (e)=> {
            e.preventDefault();
            props.filterOptionClicked(filter.id);
          }
          return <FilterItem key={index}>
            <Filter  filterData={filter} onFilterSelect={filterClicked}/>
          </FilterItem>
        })
      }
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  width: 100%;
  height: 30px
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: row
`;

export default FilterTodos;