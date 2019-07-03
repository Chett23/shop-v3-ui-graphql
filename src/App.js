// premade packages
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  NavLink,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import styled from 'styled-components';
// import {ApolloProvider} from 'react-apollo'


// project specific Components
import Shop from './Pages/Shop';
import Tacos from './Pages/Tacos';
import Admin from './Pages/Admin';
import Login from './Pages/Login';
import Create from './Pages/Create';
import Reset from './Pages/Reset';
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
  margin: 0 5px;
  text-decoration: none;
  font-weight: bold;
  color: #909090;
`
const NavTitle = styled(Title)`
  margin 0 5px;
  color: #909090;
  cursor: pointer;
`;

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [cartView, setCartView] = useState(false)



  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    user && setLoggedIn(true)
  }, [loggedIn])

  return (
    <Col className="App">
      <Router>
        <HeadBar>
          <NavTitleLink to='/' >Home</NavTitleLink>
          <Row>
            <NavTitle onClick={() => setCartView(!cartView)} >Cart</NavTitle>
            <NavTitleLink to='/admin' >Admin</NavTitleLink>
            {/* <NavTitle onClick={() => handleLoggout()} >Loggout</NavTitle> */}
          </Row>
        </HeadBar>
        <Switch>
          <Route exact path='/' render={() => <Shop showCart={cartView} />} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/admin/login' component={Login} />
          <Route path='/admin/login/create' component={Create} />
          <Route path='/admin/login/password/reset' component={Reset} />
          <Route exact path='/easter-eggs/tacos' component={Tacos} />
        </Switch>
      </Router>
    </Col>
  );
}

export default App;