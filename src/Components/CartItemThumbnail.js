import React from 'react';
import styled from 'styled-components';

import Col from './Col';
import Text from './Text';

import { removeFromCart } from '../Data/Cart';

const Thumbnail = styled(Col)`
  width: 250px;
  height: 390px;
  box-shadow: 0px 0px 5px grey;
  margin: 20px;
`;

const Button = styled.div`
  background-color: #133564;
  width: 100%;
  margin: 18px auto;
  color: white;
  text-align: center;
  padding: 10px 0;
  align-self: center;
  cursor: pointer;
`;



export default function CartItemThumbnail({ item: { name, price, url, _id } }) {
  const removeItemFromCart = () => () => {
    removeFromCart(_id)
  }

  return (
    <Thumbnail>
      <Text>{`name: ${name}`}</Text>
      <Text>{`price: ${price}`}</Text>
      <img style={{ width: 250, height: 250 }} src={url} alt='' />
      <Button onClick={removeItemFromCart(_id)}>Remove From Cart</Button>
    </Thumbnail>
  )
}