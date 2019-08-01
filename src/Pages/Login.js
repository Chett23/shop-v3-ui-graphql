// Premade Packages
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

// Project Specific Components
import Col from '../Components/Col';
import Row from '../Components/Row';
import Text from '../Components/Text';


// Project Specific Methods/Functions
import { login } from '../Data/User'

const MainCont = styled(Col)`
  width: 40%;
  margin: 10% auto;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: #909090;
  box-shadow: 0px 0px 5px grey;
`;
const LoginTitle = styled.h1`
  text-align: center;
`;
const LoginRow = styled(Row)`
  width: 100%;
  justify-content: space-around;
  margin: 5px;
`;
const LoginText = styled(Text)`
  width: 40px;
`;
const LoginInput = styled.input`
  width: 70%;
`;
const LoginLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const LoginButton = styled.button`
  background-color: #133564;
  width: 45%;
  margin: 18px auto;
  padding: 0;
  margin-bottom: 0;
  color: white;
  text-align: center;
  padding: 10px 0;
  align-self: center;
  border: 1px solid #133564;
  border-radius: 10px;
`;
const ButtonText = styled(Text)`
  color: white;
  font-size: 14pt;
  margin: 0;
`;
const ErrorMsg = styled(Text)`
  color: #FF0000;
  font-size: 20pt;
  margin: 15px 0 10px 0;
  text-align: center;
`;



export default function Login({loggedIn}) {
  const [user, setUser] = useState('')
  const [usrname, setUsrname] = useState('')
  const [password, setPassword] = useState('')
  const [fail, setFail] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = { username: usrname, password }
    console.log(user)
    login(user)
      .then(user => {
        sessionStorage.setItem("user", JSON.stringify(user))
        setUser(user)
      })
      .catch( err => {
        setFail(true)
      })

  }

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user')) 
    user && setUser(user)
    loggedIn || setUser(null)
  },[])

  return (
    user ?
    <Redirect to='/admin' />
    :
    <form onSubmit={handleSubmit}>
      <MainCont>
        <LoginTitle>Admin Login</LoginTitle>
        {fail && <ErrorMsg>Incorrect credentials</ErrorMsg>}
        <LoginRow><LoginText>Username: </LoginText><LoginInput type={'text'} onChange={(e) => setUsrname(e.target.value)} onClick={() => {setFail(false);setUsrname('')}} value={usrname} placeholder="username . . ."></LoginInput></LoginRow>
        <LoginRow><LoginText>Password: </LoginText><LoginInput type={'password'} onChange={(e) => setPassword(e.target.value)} onClick={() => {setFail(false);setPassword('')}} value={password} placeholder="password . . ."></LoginInput></LoginRow>
        <Row>
          <LoginButton onClick={handleSubmit} type={'submit'}><ButtonText>Submit</ButtonText></LoginButton>
          <LoginButton><LoginLink to='/admin/login/create'><ButtonText>Create User</ButtonText></LoginLink></LoginButton>
        </Row>
      </MainCont>
    </form>
  )
}