// premade packages
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

// project specific Components
import styled from 'styled-components';
import Col from '../Components/Col';
import Row from '../Components/Row';
import Text from '../Components/Text';
import Title from '../Components/Title';
import ItemThumbnail from '../Components/ItemThumbnail';

// project specific methods/functions
import { getCart, addToCart, removeFromCart } from '../Data/Cart';

const MainCont = styled(Row)`
  width: 80%;
  margin: 0 auto;
  justify-items: space-between;
`;

const Store = styled(Row)`
  width: auto;
  border-radius: 10px;
  box-shadow: 0px 0px 5px grey;
  margin 20px;
  justify-content: center;
`;

const Cart = styled(Row)`
  width: auto;
  box-shadow: 0px 0px 5px grey;
  border-radius: 10px;
  margin 20px;
  justify-content: center;
`;

const SectionTitle = styled(Text)`
  width: 100%;
  text-align: center;
`;


function Shop({ showCart }) {
  const [items, setItems] = useState([])
  const [cart, setCart] = useState([])
  // const [inStock, setInstock] = useState(true)

  const addItemToCart = ({ name, price, url, _id, stock }) => () => {
    const item = { name, price, url, _id, stock }
    addToCart(item)
      .then(() => {
        getCart().then((cart) => setCart(cart))
      })
  }

  const removeItemFromCart = ({ _id }) => () => {
    removeFromCart(_id)
      .then(() => getCart().then((cart) => {
        let item = cart.find(item => item._id === _id)
        if (item.stock <= 0) { }
        setCart(cart)
      }))
  }

  useEffect(() => {
    getCart()
      .then(cart => {
        setCart(cart || [])
      })
  }, []);

  return (

    <Col>
      <MainCont>
        <Store>
          <Col>
            <SectionTitle>Store</SectionTitle>
            <Row>
              <Query query={gql`
                {
                  items{
                    name,
                    price,
                    imgUrl,
                  }
                }
                `}>
                {({ loading, error, data }) => {
                  if (loading) return <Title>Loading . . . </Title>
                  if (error) console.log(error)

                  return data.items.map((item, i) => <ItemThumbnail key={i} item={item} func={() => addItemToCart(item)} />)
                }}
              </Query>
            </Row>
          </Col>
        </Store>
        {showCart &&
          <Cart>
            <Col>
              <SectionTitle>Cart</SectionTitle>
              <Row>
              <Query query={gql`
                {
                  items{
                    name,
                    price,
                    imgUrl,
                  }
                }
                `}>
                {({ loading, error, data }) => {
                  if (loading) return <Title>Loading . . . </Title>
                  if (error) console.log(error)

                  return data.items.map((item, i) => <ItemThumbnail key={i} item={item} func={() => addItemToCart(item)} />)
                }}
              </Query>
              </Row>
            </Col>
          </Cart>
        }
      </MainCont>
    </Col>
    // <Col>
    //   <MainCont>
    //     <Store>
    //       <Col>
    //         <SectionTitle>Store</SectionTitle>
    //         <Row>
    //           {items.map((item, i) => <ShopItemThumbnail key={i} item={item} func={() => addItemToCart(item)} />)}
    //         </Row>
    //       </Col>
    //     </Store>
    //     {showCart &&
    //       <Cart>
    //         <Col>
    //           <SectionTitle>Cart</SectionTitle>
    //           <Row>
    //             {
    //               cart.length ?
    //               cart.map((item, i) => <CartItemThumbnail key={i} item={item} func={() => removeItemFromCart(item)} />)
    //               : <Title>Nothing in your Cart</Title>
    //             }
    //           </Row>
    //         </Col>
    //       </Cart>
    //     }
    //   </MainCont>
    // </Col>
  );
}

export default Shop;