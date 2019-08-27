import React from 'react';
import styled from 'styled-components';

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
const ButtonDis = styled(Button)`
  background-color: #E4E4E4;
  border: 2px solid #133564;
  color: #AAAAAA;
`;


export default function ItemThumbnail({ item: { name, price, imgUrl, id, stock, qty }, func }) {
  return (
    <Thumbnail>
      <Col>
        <TextSmall>{`Name: ${name}`}</TextSmall>
        <TextSmall>{`Price: $${price}`}</TextSmall>
        <TextSmall>{`qty: ${qty}`}</TextSmall>
        {qty > 0 && func.toString().includes('remove') && <TextSmall>{`Quantity: ${qty}`}</TextSmall>}
      </Col>
      <img style={{ width: 150, height: 150 }} src={imgUrl} alt='' />
      {stock < 1 ? <ButtonDis disabled>Temporarily out of stock</ButtonDis> : func.toString().includes('remove') ?  <Button onClick={func()}>Remove from Cart</Button> : <Button onClick={func()}>Add to Cart</Button>}
    </Thumbnail>
  )
}