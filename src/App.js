// premade packages
import React, {useState} from 'react';
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
import Admin from './Pages/Admin';
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
  const [cartView, setCartView] = useState(false)

  const toggleCartView = () => {
    setCartView(!cartView)
  }

  return (
    <Col className="App">
      <Router>
        <HeadBar>
         <NavTitleLink to='/' >Home</NavTitleLink>
          <Row>
           <NavTitleLink to='/Login' >Login</NavTitleLink>
           <NavTitleLink to='/Admin' >Admin</NavTitleLink>
           <NavTitle onClick={()=>toggleCartView()} >Cart</NavTitle>
          </Row>
        </HeadBar>
        <Switch>
          <Route exact path='/' render={() => <Shop showCart={cartView} />}/>
          <Route path='/Admin' component={Admin}/>
          <Route exact path='/Tacos' component={Tacos}/>
        </Switch>
      </Router>
    </Col>
  );
}

export default App;