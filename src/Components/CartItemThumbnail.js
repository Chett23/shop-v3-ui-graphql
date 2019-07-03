import React from 'react';
import styled from 'styled-components';

// import Row from './Row';
// import {Rowhigh} from './Row';
import Col from './Col';
import { TextSmall } from './Text';
import Button from './Button';



const Thumbnail = styled(Col)`
  width: 150px;
  height: 300px;
  box-shadow: 0px 0px 5px grey;
  margin: 10px;
  padding: 10px;
  justify-content: space-between;
`;



export default function CartItemThumbnail({ item: { name, price, url, _id, qty }, func }) {
  return (
    <Thumbnail >
      <Col>
        <TextSmall>{`Name: ${name}`}</TextSmall>
        <TextSmall>{`Price: $${(price * qty).toFixed(2)}`}</TextSmall>
        <TextSmall>{`Quantity: ${qty}`}</TextSmall>
      </Col>
      <img style={{ width: 150, height: 150 }} src={url} alt='' />
      <Button onClick={func(_id)}>Remove From Cart</Button>
    </Thumbnail>
  )
}