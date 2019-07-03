// Premade Packages
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';

// Project Specific Components
import Col from '../Components/Col';
import Row from '../Components/Row';
import Text from '../Components/Text';
import Button from '../Components/Button';


// Project Specific Methods/Functions
import { changePass } from '../Data/User'

const MainCont = styled(Col)`
  width: 40%;
  margin: 10% auto;
  padding-bottom: 20px;
  border-radius: 10px;
  background-color: #909090;
  box-shadow: 0px 0px 5px grey;
`;
const ResetTitle = styled.h1`
  text-align: center;
`;
const ResetRow = styled(Row)`
  width: 100%;
  justify-content: space-around;
  margin: 5px;
`;
const ResetText = styled(Text)`
  width: 160px;
  margin: 0;
`;
const ResetInput = styled.input`
  height: 20px;
  width: 65%;
  align-self: center;
`;
const ResetButton = styled.button`
  background-color: #133564;
  width: 80%;
  margin: 18px auto;
  padding: 0;
  cursor: pointer;
  margin-bottom: 0;
  color: white;
  text-align: center;
  padding: 10px 0;
  align-self: center;
  border: 1px solid #133564;
  border-radius: 10px;
`;
const ResetButtonDis = styled(ResetButton)`
  background-color: #E4E4E4;
  color: #AAAAAA;
  font-size: 14pt;
  margin: 0 auto;
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
const SuccessMsg = styled(Text)`
  color: #228B22;
  font-size: 20pt;
  text-align: center;
  margin: 15px 0 10px 0;
`;
const ResetBtnMid = styled(ResetButton)`
  width: 45%;
  margin: 5px auto;
`;
const ResetLinkBtn = styled(ResetButton)`
  width: 80%;
  margin: 5 auto;
`;
const ResetLink = styled(Link)`
  text-decoration: none;
  width: 45%;
`;
const LoggoutButton = styled(Button)`
  margin: 0;
  color: #909090;
  border-radius: 0;
  font-weight: bold;
`;



export default function Reset() {
  const [usrname, setUsrname] = useState('')
  const [newPass, setNewPass] = useState('')
  const [newPassConf, setNewPassConf] = useState('')
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault();

    let userInfo = { username: usrname, password: newPass }

    changePass(userInfo)
      .then(user => {
        setSuccess(true)
        setFail(false)
        setUsrname('')
        setNewPass('')
        setNewPassConf('')
      })
      .catch(err => { setFail(true); setSuccess(false) })

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
    <React.Fragment>
      <LoggoutButton onClick={handleLoggout} >Loggout</LoggoutButton>
      <form onSubmit={handleSubmit}>
        <MainCont>
          <ResetTitle>Password Reset</ResetTitle>
          <ResetRow><ResetText>Username: </ResetText><ResetInput type={'text'} onChange={(e) => setUsrname(e.target.value)} value={usrname} placeholder="username . . ." onClick={() => { setFail(false); setSuccess(false) }}></ResetInput></ResetRow>
          <ResetRow><ResetText>New Password: </ResetText><ResetInput type={'password'} onChange={(e) => setNewPass(e.target.value)} value={newPass} placeholder="new password . . ." onClick={() => { setFail(false); setSuccess(false) }}></ResetInput></ResetRow>
          <ResetRow><ResetText>Confirm Password: </ResetText><ResetInput type={'password'} onChange={(e) => setNewPassConf(e.target.value)} value={newPassConf} placeholder="confirm new password . . ." onClick={() => { setFail(false); setSuccess(false) }}></ResetInput></ResetRow>
          {newPass !== newPassConf && <ErrorMsg>Passwords do not match</ErrorMsg>}
          {success && <SuccessMsg>Password was successfully changed</SuccessMsg>}
          {fail && <ErrorMsg>We encountered a problem please try again</ErrorMsg>}
          <Row>
            {
              newPass === newPassConf ?
                success ?
                  <ResetRow>
                    <ResetBtnMid onClick={handleSubmit} type={'submit'}><ButtonText>Submit</ButtonText></ResetBtnMid>
                    <ResetLink to="/admin" ><ResetLinkBtn><ButtonText>Go Back</ButtonText></ResetLinkBtn></ResetLink>
                  </ResetRow>
                  :
                  <ResetButton onClick={handleSubmit} type={'submit'}><ButtonText>Submit</ButtonText></ResetButton>
                :
                <ResetButtonDis disabled onClick={handleSubmit} type={'submit'}><ButtonText>Submit</ButtonText></ResetButtonDis>
            }
          </Row>
        </MainCont>
      </form>
    </React.Fragment>
    :
    <Redirect to='/admin/login' />
  )
}