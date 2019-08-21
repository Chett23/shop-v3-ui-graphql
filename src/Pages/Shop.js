// premade packages
import React, { useState, useEffect } from 'react';
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import Loader from 'react-loaders';



// project specific Components
import styled from 'styled-components';
import Col from '../Components/Col';
import Row from '../Components/Row';
import Text from '../Components/Text';
import Title from '../Components/Title';
import ItemThumbnail from '../Components/ItemThumbnail';

// project specific methods/functions
// import { getCart, removeFromCart } from '../Data/Cart';

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


// graphql
const GET_INVENTORY = gql`
{
  inventory{
    name,
    price,
    imgUrl,
    id
  }
}`

const GET_CART = gql`
{
  user {
    cart{
      item{
        name
        id
        imgUrl
        price
      }
      qty
    }
  }
}`

const ADD_TO_CART = gql`
  mutation addToCart($itemId: ID!, $qty: Int!, $status: Status!){
    addToCart(itemId: $itemId, qty: $qty, status: $status){
      item{
        name
      }
      qty
      status
    }
  }
`


function Shop({ showCart }) {
  const { loading: inventoryLoading, error: inventoryError, data: { inventory } } = useQuery(GET_INVENTORY)
  const { loading: userCartLoading, error: userCartError, data: { user } } = useQuery(GET_CART)
  const [addToCart, { data, loading: addToCartLoading, error: addToCartError }] = useMutation(ADD_TO_CART)
  const [guest, setGuest] = useState(false)
  const [guestCart, setGuestCart] = useState([])


  const addItemToCart = (item) => () => {
    if (guest) {
      let index = guestCart.findIndex(el => el.id === item.id) 
      let tempCart = guestCart
      item['qty'] = (item['qty'] || 0) + 1 ;        
      if(index >= 0) {
        // item.qty = item.qty + 1
        tempCart[index] = item
        sessionStorage.setItem('guestCart', JSON.stringify(tempCart))
        setGuestCart(JSON.parse(sessionStorage.getItem('guestCart')))
      }else {
        tempCart.push(item)
        sessionStorage.setItem('guestCart', JSON.stringify(tempCart))
        setGuestCart(JSON.parse(sessionStorage.getItem('guestCart')))
      }
    } else {
      addToCart({ variable: { itemId: item.id, qty: item.qty, status: 'InCart' } })
      console.log(data)
    }
  }

  const removeItemFromCart = (id) => () => {
    if (guest) {
      let tempCart = guestCart
      if(guestCart[id].qty > 1) {
        tempCart[id]['qty'] = tempCart[id]['qty'] -1;
        sessionStorage.setItem('guestCart', JSON.stringify(tempCart))
        setGuestCart(JSON.parse(sessionStorage.getItem('guestCart')))
      }else {
        let spliced = tempCart.splice(id-1,0)
        console.log(spliced)
        sessionStorage.setItem('guestCart', JSON.stringify(tempCart))
        setGuestCart(JSON.parse(sessionStorage.getItem('guestCart')))
      }
    } else {
      // addToCart({ variable: { itemId: item.id, qty: item.qty, status: 'InCart' } })
    }


    // removeFromCart(_id)
    //   .then(() => getCart().then((cart) => {
    //     let item = cart.find(item => item._id === _id)
    //     if (item.stock <= 0) { }
    //     setCart(cart)
    //   }))
  }


  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('userData')) || 'guest';
    user === 'guest' && setGuest(true)
    setGuestCart(JSON.parse(sessionStorage.getItem('guestCart')) || [])
  }, []);


  if (addToCartLoading) return <Loader type='ball-clip-rotate' />
  if (addToCartError) console.log(addToCartError)

  if (inventoryLoading) return <Loader type='ball-clip-rotate' />
  if (inventoryError) console.log(inventoryError)

  if (userCartLoading) return <Loader type='ball-clip-rotate' />
  if (userCartError) console.log(userCartError)

  return (

    <Col>
      <MainCont>
        <Store>
          <Col>
            <SectionTitle>Store</SectionTitle>
            <Row>
              {inventory.map((item, i) => <ItemThumbnail key={i} item={item} func={() => addItemToCart(item)} />)}
            </Row>
          </Col>
        </Store>
        {
          showCart &&
          <Cart>
            <Col>
              <SectionTitle>Cart</SectionTitle>
              <Row>
                {
                  guest ?
                  guestCart.length > 0 ? guestCart.map((item, i) => <ItemThumbnail key={i} item={item} func={() => removeItemFromCart(i)} />) : <Title>Nothing in your cart</Title>
                  :
                  user.cart.length > 0 ? user.cart.map((item, i) => <ItemThumbnail key={i} item={item.item} func={() => removeItemFromCart(item.id)} />) : <Title>Nothing in your cart</Title>
                }
              </Row>
            </Col>
          </Cart>
        }
      </MainCont>
    </Col>
  );
}

export default Shop;