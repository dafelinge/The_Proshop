import { useNavigate } from 'react-router-dom';
import React from 'react';
import {Navbar, Badge, Nav, Container, NavDropdown} from 'react-bootstrap';
import {FaShoppingCart, FaUser} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';
import logo from '../assets/logo.png';
import {LinkContainer} from 'react-router-bootstrap';
import { Link } from 'react-router-bootstrap';



const Header = () => {
  const {cartItems } = useSelector((state) => state.cart);
  const {userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.log(err);
  }
}

  return (
    <header>
        <Navbar bg='primary' variant = 'dark' expand='lg' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
            <Navbar.Brand> 
                <img src={logo} alt="ProShop" /> ProShop</Navbar.Brand>

                 </LinkContainer>
                <Navbar.Toggle aria-controls = 'basic-navbar-nav' />
                <Navbar.Collapse id = 'basic-navbar-nav'> </Navbar.Collapse>
                <Nav className = 'ms-auto d-flex align-items-center'></Nav>

                <LinkContainer to='/cart'>
                <Nav.Link style = {{ marginRight : '200px'}}> <FaShoppingCart /> Cart 
                  
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style = {{marginRight: '10px'}} >
                      
                      {cartItems.reduce((a,c) => a + c.qty, 0)}
                    </Badge>
                  )}          
                </Nav.Link>
                </LinkContainer>


                {userInfo ? (
                  <NavDropdown title = {userInfo.name} id = 'username' style={{marginLeft : '20px'}}>
                    <LinkContainer to = '/profile'>
                    <NavDropdown.Item> Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick = {logoutHandler}> Logout 
                    </NavDropdown.Item>
                    

                  </NavDropdown>
                ) : (<LinkContainer to = '/login'>
                <Nav.Link> <FaUser /> Sign In</Nav.Link>
                </LinkContainer> )}

                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title = 'Admin' id = 'adminmenu'>
                    <LinkContainer to = '/admin/productlist'>
                      <NavDropdown.Item> Products </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to = '/admin/userlist'>
                      <NavDropdown.Item> Users </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to = '/admin/orderlist'>
                      <NavDropdown.Item> Orders </NavDropdown.Item>
                      </LinkContainer>

                  </NavDropdown>
                )}

            </Container>
        </Navbar>
    </header>
  )
}
//reduce function iterates through each item in the cartItems array and adds the qty property of each item, ititial value of a is 0
export default Header