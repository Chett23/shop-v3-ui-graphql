import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import styled from 'styled-components';

import Row from '../Components/Row';
import Col from '../Components/Col';
import Text from '../Components/Text';
import Title from '../Components/Title';
import Button from '../Components/Button';

import { getItems, addToInventory, RemoveFromInventory } from '../Data/Items';
import { getUsers, RemoveUser, createUser } from '../Data/User';


// Styled Components in AdminForm
const MainCont = styled(Row)`
  width: 95%;
  margin: 5% auto;
`;
const AdminFormCont = styled(Col)`
  background-color: #909090;
  margin: 2% auto;
  padding: 20px;
  width: 45%;
  height: 300px;
  border-radius: 15px;
  box-shadow: 0px 0px 5px grey;
`;

const AdminFormRow = styled(Row)`
  justify-content: center;
  align-content: coneter;
  margin: 5px;
`;

const AdminFormInput = styled.input`
  width: 80%;
  height: 20px;
`;

const AdminFormText = styled(Text)`
  width: 15%;
`;

const AdminFormTitle = styled(Title)`
margin: 10px;
text-align: center;
font-size: 18pt;
`;
const FormBtn = styled(Button)`
  margin: 2px 5px;
  width: 45%;
  height: 15px;
  justify-content: center;
`;

// Styled Components in InventoryList
const Cont = styled(Col)`
  background-color: #909090;
  margin: 2% auto;
  padding: 20px;
  width: 45%;
  height: auto;
  flex-wrap: wrap;
  border-radius: 15px;
  justify-content: flex-start;
  box-shadow: 0px 0px 5px grey;
`;
const ItemDiv = styled(Row)`
  border-bottom: 1px solid black;
  justify-content: center;
  margin: 5px;
  height: auto;
  width: 100%;
`;
const ItemContL = styled(Col)`
  flex: 1;
  display: flex;
  min-wisth: -webkit-min-contnet;
`;
const ItemContC = styled(Col)`
  flex: 1;
  display: flex;
  min-wisth: -webkit-min-contnet;
`;
const ItemContR = styled(Row)`
  flex: 1;
  display: flex;
  min-wisth: -webkit-min-contnet;
  justify-content: flex-end;
`;
const Btn = styled(Button)`
  margin: 1.5px 5px;
  width: 80px;
  height: 15px;
  justify-content: center;
`;
const BtnWide = styled(Btn)`
  width: 98%;
  margin-bottom: 3px;
`;
const ListCont = styled(Col)`
  width: 100%;
`;
const CreateLink = styled(Link)`
  text-decoration: none;
`;
const LoggoutButton = styled(Button)`
  margin: 0;
  color: #909090;
  border-radius: 0;
  font-weight: bold;
`;


export default function Admin({ loggedIn }) {
  //state items for Items/inventory
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');
  const [stock, setStock] = useState('');
  const [editId, setEditId] = useState('');


  //state items for Users
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState('');
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    if (e.target.name === 'setName') { setName(e.target.value) }
    if (e.target.name === 'setPrice') { setPrice(e.target.value) }
    if (e.target.name === 'setUrl') { setUrl(e.target.value) }
    if (e.target.name === 'setStock') { setStock(e.target.value) }
    if (e.target.name === 'setFname') { setFname(e.target.value) }
    if (e.target.name === 'setLname') { setLname(e.target.value) }
    if (e.target.name === 'setUserName') { setUserName(e.target.value) }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (editUserId) {
      const user = { firstname: fname, lastname: lname, username: userName, _id: editUserId }
      setFname('');
      setLname('');
      setUserName('');
      setEditUserId('');
      createUser(user)
        .then(() => getUsers().then(users => setUsers(users)))
    } else if (name && price && url && stock !== '') {
      const item = editId ? { name: name, price: price, url: url, stock: stock, _id: editId } : { name: name, price: price, stock: stock, url: url }
      setName('');
      setPrice('');
      setUrl('');
      setEditId('');
      setStock('');
      addToInventory(item)
        .then(() => getItems().then((items) => setItems(items)))
    }
  }

  const handleLoggout = () => {
    sessionStorage.removeItem('user')
    setLoading(false)
    setUser('')
  }

  const handleEdit = (id) => () => {
    getItems()
      .then((items) => {
        const item = items.find(item => item._id === id)
        setName(item.name)
        setPrice(item.price)
        setUrl(item.url)
        setStock(item.stock)
        setEditId(item._id)
        setFname('');
        setLname('');
        setUserName('');
        setEditUserId('');
      })
  }

  const handleRemove = (id) => () => {
    RemoveFromInventory(id)
      .then(() => getUsers().then(inventory => setUsers(inventory)))
  }
  const handleEditUser = (id) => () => {
    getUsers()
      .then((users) => {
        const user = users.find(user => user._id === id)
        setFname(user.firstname)
        setLname(user.lastname)
        setUserName(user.username)
        setEditUserId(user._id)
        setName('');
        setPrice('');
        setUrl('');
        setEditId('');
        setStock('');
      })
  }

  const handleRemoveUser = (id) => () => {
    RemoveUser(id)
      .then(() => getUsers().then(users => setUsers(users)))
  }

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      setUser(user);
      setLoading(false)
    } else {
      setLoading(false)
    }
    getItems().then((items) => setItems(items))
    getUsers().then(users => setUsers(users))
    // loggedIn || setLoading(false)
  }, []);

  return (loading || user ?
    <React.Fragment>
      <LoggoutButton onClick={handleLoggout} >Loggout</LoggoutButton>
      <MainCont>
        {
          editUserId ?
            <AdminFormCont>
              <AdminFormTitle>Edit Admin Profile</AdminFormTitle>
              <AdminFormRow>
                <AdminFormText>First Name: </AdminFormText>
                <AdminFormInput name={'setFname'} value={fname} onChange={handleChange} />
              </AdminFormRow>
              <AdminFormRow>
                <AdminFormText>Last Name: </AdminFormText>
                <AdminFormInput name={'setLname'} value={lname} onChange={handleChange} />
              </AdminFormRow>
              <AdminFormRow>
                <AdminFormText>Username: </AdminFormText>
                <AdminFormInput name={'setUserName'} value={userName} onChange={handleChange} />
              </AdminFormRow>
              <AdminFormRow>
                <FormBtn onClick={onSubmit} >Submit Changes</FormBtn>
                <FormBtn onClick={() => { setEditUserId(''); setFname(''); setLname(''); setUserName('') }}>Add Item</FormBtn>
              </AdminFormRow>
            </AdminFormCont>
            :
            <AdminFormCont>
              {editId ? <AdminFormTitle>Edit Item In Inventory</AdminFormTitle> : <AdminFormTitle>Add Item To Inventory</AdminFormTitle>}
              <AdminFormRow>
                <AdminFormText>Name: </AdminFormText>
                <AdminFormInput placeholder={'Please enter item name. . . '} name={'setName'} value={name} onChange={handleChange} />
              </AdminFormRow>
              <AdminFormRow>
                <AdminFormText>Price: </AdminFormText>
                <AdminFormInput placeholder={'Please enter item price . . . '} name={'setPrice'} value={price} onChange={handleChange} />
              </AdminFormRow>
              <AdminFormRow>
                <AdminFormText>Url: </AdminFormText>
                <AdminFormInput placeholder={'Please enter item url . . . '} name={'setUrl'} value={url} onChange={handleChange} />
              </AdminFormRow>
              <AdminFormRow>
                <AdminFormText>in stock: </AdminFormText>
                <AdminFormInput placeholder={'Please enter amount in stock . . . '} name={'setStock'} value={stock} onChange={handleChange} />
              </AdminFormRow>
              <AdminFormRow>
                {
                  editId ?
                    <React.Fragment>
                      <FormBtn onClick={onSubmit} >Submit Changes</FormBtn>
                      <FormBtn onClick={() => { setEditId(''); setName(''); setPrice(''); setStock(''); setUrl('') }}>Add Item</FormBtn>
                    </React.Fragment>
                    :
                    <Button onClick={onSubmit} >Add Item to Inventory</Button>
                }
              </AdminFormRow>
            </AdminFormCont>
        }
        <Cont>
          <AdminFormTitle>Current Inventory</AdminFormTitle>
          <ListCont>
            {items.map((item, i) =>
              <ItemDiv key={i}>
                <ItemContL>
                  <Text>{`Name: ${item.name}`}</Text>
                  <Text>{`Price: ${item.price}`}</Text>
                </ItemContL>
                <ItemContC>
                  <Text>{`qty: ${item.stock}`}</Text>
                  <Text>{`Product Id: ${item._id}`}</Text>
                </ItemContC>
                <ItemContR>
                  <Btn onClick={handleEdit(item._id)}>Edit</Btn>
                  <Btn onClick={handleRemove(item._id)}>Remove</Btn>
                </ItemContR>
              </ItemDiv>
            )}
          </ListCont>
        </Cont>
        <Cont>
          <AdminFormTitle>Current Admins</AdminFormTitle>
          <ListCont>
            {users.map((user, i) =>
              <ItemDiv key={i}>
                <ItemContL>
                  <Text>{`First Name: ${user.firstname}`}</Text>
                  <Text>{`Last Name: ${user.lastname}`}</Text>
                  <Text>{`Username: ${user.username}`}</Text>
                </ItemContL>
                <Col>
                  <Row>
                    <Btn onClick={handleEditUser(user._id)}>Edit</Btn>
                    <Btn onClick={handleRemoveUser(user._id)}>Remove</Btn>
                  </Row>
                  <Col>
                    <CreateLink to="/admin/login/password/reset" ><BtnWide>Reset Password</BtnWide></CreateLink>
                  </Col>
                </Col>
              </ItemDiv>
            )}
          </ListCont>
          <Col>
            <CreateLink to="/admin/login/create" ><Button>Create new user</Button></CreateLink>
          </Col>
        </Cont>
      </MainCont>
    </React.Fragment>
    :
    <Redirect to='/admin/login' />
  )
}