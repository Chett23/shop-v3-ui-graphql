// Premade Packages
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

// Project Specific Components
import Col from '../Components/Col';
import Row from '../Components/Row';
import Text from '../Components/Text';
import Button from '../Components/Button';


// Project Specific Methods/Functions
import { createUser } from '../Data/User';

const MainCont = styled(Col)`
  width: 50%;
  margin: 10% auto;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: #909090;
  box-shadow: 0px 0px 5px grey;
`;
const CreateTitle = styled.h1`
  text-align: center;
`;
const CreateRow = styled(Row)`
  width: auto;
  justify-content: space-between;
  align-content: space-around;
  margin: 1px;
  padding: 0 25px;
`;
const CreateInput = styled.input`
  width: 75%;
  height: 15px;
`;
const CreateButton = styled.button`
  background-color: #133564;
  width: 90%;
  margin: 20px auto;
  margin-bottom: 0;
  padding: 0;
  color: white;
  text-align: center;
  align-self: center;
  padding: 10px 0;
  border: 2px solid #133564;
  border-radius: 10px;
`;
const CreateButtonDis = styled(CreateButton)`
  background-color: #E4E4E4;
  color: #AAAAAA;
  font-size: 14pt;
  margin: 0;
`;
const ButtonText = styled(Text)`
  color: white;
  font-size: 14pt;
  margin: 0;
`;
const ErrorMsg = styled(Text)`
  color: #FF0000;
  font-size: 20pt;
  text-align: center;
  margin: 15px;
`;
const LoggoutButton = styled(Button)`
  margin: 0;
  color: #909090;
  border-radius: 0;
  font-weight: bold;
`;



export default function Create() {
  const [created, setCreated] = useState(false)
  const [fname, setFname] = useState('')
  const [lname, setLname] = useState('')
  const [usrname, setUsrname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConf, setPasswordConf] = useState('')
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      firstname: fname,
      lastname: lname,
      username: usrname,
      password,
    }
    console.log(newUser)

    createUser(newUser)
      .then(user => {
        setCreated(true)
      })


  }

  const handleLoggout = () => {
    sessionStorage.removeItem('user')
    setLoading(false)
    setUser('')
  }

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      setUser(user);
      setLoading(false)
    } else {
      setLoading(false)
    }
  }, [])

  return (loading || user ?
    created ?
      <Redirect to='/admin/login' />
      :
      <React.Fragment>
        <LoggoutButton onClick={handleLoggout} >Loggout</LoggoutButton>
        <form onSubmit={handleSubmit}>
          <MainCont>
            <CreateTitle>Create Admin User</CreateTitle>
            <CreateRow><Text>First Name: </Text><CreateInput type={'text'} onChange={(e) => setFname(e.target.value)} value={fname} placeholder="first name . . ."></CreateInput></CreateRow>
            <CreateRow><Text>Last Name: </Text><CreateInput type={'text'} onChange={(e) => setLname(e.target.value)} value={lname} placeholder="last name . . ."></CreateInput></CreateRow>
            <CreateRow><Text>Username: </Text><CreateInput type={'text'} onChange={(e) => setUsrname(e.target.value)} value={usrname} placeholder="username . . ."></CreateInput></CreateRow>
            <CreateRow><Text>Password: </Text><CreateInput type={'password'} onChange={(e) => setPassword(e.target.value)} value={password} placeholder="password . . ."></CreateInput></CreateRow>
            <CreateRow><Text>Confirm Password: </Text><CreateInput type={'password'} onChange={(e) => setPasswordConf(e.target.value)} value={passwordConf} placeholder="confirm password . . ."></CreateInput></CreateRow>
            {
              password === passwordConf ?
                <CreateButton onClick={handleSubmit} type={'submit'}><ButtonText>Create User</ButtonText></CreateButton>
                :
                <React.Fragment>
                  <ErrorMsg>Passwords do not match</ErrorMsg>
                  <CreateButtonDis disabled onClick={handleSubmit} type={'submit'}>Create User</CreateButtonDis>
                </React.Fragment>
            }
          </MainCont>
        </form>
      </React.Fragment>
    :
    <Redirect to='/admin/login' />
  )
}