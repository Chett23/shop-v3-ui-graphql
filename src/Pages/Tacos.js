import React from 'react';
import styled from 'styled-components';

import Col from '../Components/Col';
import Row from '../Components/Row';
import Title from '../Components/Title';


const RowCentered = styled(Row)`
  justify-content: center;
`;

export default () => (
  <RowCentered>
    <Col>
      <Title>Tacos for Edmundo!!!</Title>
      <img src={'https://media.tenor.com/images/c80c99b8d22f51ed585cefa4d2d7562f/tenor.gif'} alt='' />
    </Col>
  </RowCentered>
)