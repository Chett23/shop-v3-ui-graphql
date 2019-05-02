// premade packages
import React, { useState, useEffect } from 'react';
import { } from 'react-router-dom';

// project specific Components
import styled from 'styled-components';
import Col from '../Components/Col';
import Row from '../Components/Row';
import Title from '../Components/Title';
import Text from '../Components/Text';
import ShopItemThumbnail from '../Components/ShopItemThumbnail';
import CartItemThumbnail from '../Components/CartItemThumbnail';

// project specific methods/functions
import { getItems } from '../Data/items';
import { getCart } from '../Data/Cart';

const MainCont = styled(Row)`
  width: 80%;
  height: 100vh;
  margin: 0 auto;
`;

const Store = styled(Row)`
  width: auto;
  border: 1px solid black;
  margin 5px;
`;

const Cart = styled(Row)`
  width: 300px;
  border: 1px solid black;
  margin 5px;
`;

const SectionTitle = styled(Text)`
  text-align: center;
`;

function Shop() {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    getItems()
      .then((items) => {
        setItems(items)
      })
    getCart()
      .then(cart => {
        setCart(cart)
      })
  }, []);

  return (
    <Col>
      <MainCont>
        <Store>
          <Col>
            <SectionTitle>Store</SectionTitle>
            <Row>
              {items.map((item, i) => <ShopItemThumbnail key={i} item={item}/>)}
            </Row>
          </Col>
        </Store>
        <Cart>
          <Col>
            <SectionTitle>Cart</SectionTitle>
            <Row>
              {cart.map((item, i) => <CartItemThumbnail key={i} item={item}/>)}
            </Row>
          </Col>
        </Cart>
      </MainCont>
    </Col>
  );
}

export default Shop;