// Premade Packages
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import Loader from 'react-loaders';
import gql from 'graphql-tag'

// Project Specific Components
import Col from '../Components/Col';
import Row from '../Components/Row';
import Text from '../Components/Text';
import Title from '../Components/Title';


// Project Specific Methods/Functions
// import { login } from '../Data/User'

const MainCont = styled(Col)`
  width: 40%;
  margin: 10% auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #909090;
  box-shadow: 0px 0px 5px grey;
  text-align: center; 
  @media(max-width: 850px){
    width: 50%;
  }
  @media(max-width: 700px){
    width: 60%;
  }
`;
const LoginTitle = styled.h1`
  text-align: center;
`;
const LoginRow = styled(Row)`
  width: 100%;
  justify-content: space-around;
  margin: 5px 0;
  @media(max-width: 700px){
    flex-direction: column;
    align-content: center;
    margin: 10px 5px;
  }
`;
const LoginText = styled(Text)`
  width: 40px;
  margin: 5px 0;
`;
const LoginInput = styled.input`
  width: 65%;
  height: 18px;
  align-self: center;
  @media(max-width: 1050px){
    width: 60%;
  }
  @media(max-width: 700px){
    width: 100%;
  }
`;
const LoginLink = styled(Link)`
  color: white;
  text-decoration: none;
`;
const LoginButton = styled.button`
  background-color: #133564;
  margin: 18px auto 0 auto;
  width: 45%;
  color: white;
  text-align: center;
  padding: 10px 0;
  align-self: center;
  border: 1px solid #133564;
  border-radius: 10px;
  @media (max-width: 700px) {
    width: 100%;
    padding: 5px 0;
  }
  `;
const ButtonText = styled(Text)`
  color: white;
  font-size: 14pt;
  margin: 0;
`;
const ErrorMsg = styled(Title)`
  color: #FF0000;
  margin: 15px 0 10px 0;
  text-align: center;
`;


// Graphql
const LOGIN = gql`
  mutation Login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      user{
        name
        email
        role
      },
      token
    }
  }
`;




export default function Login({ loggedIn }) {
  const [user, setUser] = useState(null)
  const [usrname, setUsrname] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data, loading: loginLoading, error: loginError }] = useMutation(LOGIN)


  function handleSubmit(e) {
    e.preventDefault();
    login({ variables: { email: usrname, password: password } })
  }
  
  useEffect(() => {
    data && sessionStorage.setItem('userData', JSON.stringify(data.login))
    let user = JSON.parse(sessionStorage.getItem('userData'))
    user && setUser(user)
  }, [data])

  return (

    user ?
      <Redirect to='/admin' />
      :
      <form onSubmit={handleSubmit}>
        <MainCont>
          <LoginTitle>Admin Login</LoginTitle>
          {loginLoading && <Loader type='ball-clip-rotate' />}
          {loginError && <ErrorMsg>Failed to Login</ErrorMsg>}
          <LoginRow><LoginText>Username: </LoginText><LoginInput type={'text'} onChange={(e) => setUsrname(e.target.value)} onClick={() => { setUsrname('') }} value={usrname} placeholder="username . . ."></LoginInput></LoginRow>
          <LoginRow><LoginText>Password: </LoginText><LoginInput type={'password'} onChange={(e) => setPassword(e.target.value)} onClick={() => { setPassword('') }} value={password} placeholder="password . . ."></LoginInput></LoginRow>
          <Row>
            <LoginButton onClick={handleSubmit} type={'submit'}><ButtonText>Submit</ButtonText></LoginButton>
            <LoginButton><LoginLink to='/admin/login/create'><ButtonText>Create User</ButtonText></LoginLink></LoginButton>
          </Row>
        </MainCont>
      </form>
  )
}