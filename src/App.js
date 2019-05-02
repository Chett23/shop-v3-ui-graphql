// premade packages
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';


// project specific Components
import Shop from './Pages/Shop';
import Tacos from './Pages/Tacos';
import Col from './Components/Col';
import Row from './Components/Row';
import Title from './Components/Title';

// project specific methods/functions



const HeadBar = styled(Row)`
  justify-content: space-between;
  background-color: #133564;
  height: 60px;
  align-items: center;
  padding: 0px 25px;
`;

const NavTitleLink = styled(NavLink)`
  text-decoration: none;
  color: #909090
`

function App() {

  // useEffect(() => {
  // 
  // }, []);

  return (
    <Col className="App">
      <Router>
        <HeadBar>
          <Title><NavTitleLink to='/' >Home</NavTitleLink></Title>
          <Title><NavTitleLink to='/Users' >User</NavTitleLink></Title>
        </HeadBar>
        <Switch>
          <Route exact path='/' component={Shop}/>
          <Route exact path='/Tacos' component={Tacos}/>
        </Switch>
      </Router>
    </Col>
  );
}

export default App;