import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Row from '../Components/Row';
import Col from '../Components/Col';
import Text from '../Components/Text';
import Title from '../Components/Title';
import Button from '../Components/Button';

import { getItems, addToInventory, RemoveFromInventory } from '../Data/items';


// Styled Components in AdminForm
const MainCont = styled(Row)`
  width: 80%;
  margin: 0 auto;
`;
const AdminFormCont = styled(Col)`
  background-color: #909090;
  margin: 5% auto;
  padding: 20px;
  width: 45%;
  height: 250px;
  border-radius: 15px;
  box-shadow: 0px 0px 5px grey;
`;

const AdminFormRow = styled(Row)`
  justify-content: center;
  margin: 5px;
`;

const AdminFormInput = styled.input`
  width: 80%;
`;

const AdminFormText = styled(Text)`
  width: 15%;
`;

const AdminFormTitle = styled(Title)`
  margin: 10px;
  text-align: center;
  font-size: 18pt;
`;

// Styled Components in InventoryList
const InventoryCont = styled(Col)`
  background-color: #909090;
  margin: 5% auto;
  padding: 20px;
  width: 45%;
  height: auto;
  flex-wrap: wrap;
  border-radius: 15px;
  justify-content: flex-start;
  box-shadow: 0px 0px 5px grey;
`;
const InventoryTitle = styled(AdminFormTitle)``;
const InventoryItemDiv = styled(Row)`
  border-bottom: 1px solid black;
  justify-content: space-between;
  padding: 2px;
  margin: 5px;
  height: 50px;
  width: 100%;
`;
const InventoryBtn = styled(Button)`
  margin: 0 5px;
  width: 70px;
`;
const InventoryListCont = styled(Col)`
  width: 100%;
`;


export default function Admin() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [editId, setEditId] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'setName') { setName(e.target.value) }
    if (e.target.name === 'setPrice') { setPrice(e.target.value) }
    if (e.target.name === 'setUrl') { setUrl(e.target.value) }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (name && price && url !== '') {
      const item = editId ? { name: name, price: price, url: url, _id: editId } : { name: name, price: price, url: url }
      setName('');
      setPrice('');
      setUrl('');
      setEditId('');
      addToInventory(item)
      .then(() => getItems().then((items) => setItems(items)))
    }
  }

  const handleEdit = (id) => () => {
    getItems()
      .then((items) => {
        const item = items.find(item => item._id === id)
        setName(item.name)
        setPrice(item.price)
        setUrl(item.url)
        setEditId(item._id)
      })
  }

  const handleRemove = (id) => () => {
    RemoveFromInventory(id)
      .then(() => getItems().then(items => setItems(items)))
  }

  useEffect(() => {
    getItems().then((items) => setItems(items))
  }, []);

  return (
    <MainCont>
      <AdminFormCont>
        <AdminFormTitle>Add Item To Inventory</AdminFormTitle>
        <AdminFormRow>
          <AdminFormText>Name: </AdminFormText>
          <AdminFormInput name={'setName'} value={name} onChange={handleChange} />
        </AdminFormRow>
        <AdminFormRow>
          <AdminFormText>Price: </AdminFormText>
          <AdminFormInput name={'setPrice'} value={price} onChange={handleChange} />
        </AdminFormRow>
        <AdminFormRow>
          <AdminFormText>Url: </AdminFormText>
          <AdminFormInput name={'setUrl'} value={url} onChange={handleChange} />
        </AdminFormRow>
        <AdminFormRow>
          <Button onClick={onSubmit} >Submit Changes</Button>
        </AdminFormRow>
      </AdminFormCont>
      <InventoryCont>
        <InventoryTitle>Current Inventory</InventoryTitle>
        <InventoryListCont>
          {items.map((item, i) =>
            <InventoryItemDiv key={i}>
              <Col>
                <Text>{`Name: ${item.name}`}</Text>
                <Text>{`Price: ${item.price}`}</Text>
                {/* <Text>{`id: ${item._id}`}</Text> */}
              </Col>
              <Row>
                <InventoryBtn onClick={handleEdit(item._id)}>Edit</InventoryBtn>
                <InventoryBtn onClick={handleRemove(item._id)}>Remove</InventoryBtn>
              </Row>
            </InventoryItemDiv>
          )}
        </InventoryListCont>
      </InventoryCont>
    </MainCont>
  )
}