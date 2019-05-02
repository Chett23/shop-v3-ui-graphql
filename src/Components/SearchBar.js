import styled from 'styled-components';

import Title from './Title';


const SearchDiv = styled.div`
  height: 50px;
  background-color:  ${({ BGcolor, }) => BGcolor || null};
    color:  ${({ color, }) => color || null};
`;

export default function SearchBar(){
  <SearchDiv />
}