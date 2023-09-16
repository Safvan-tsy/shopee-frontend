import React from 'react';
import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../../../assets/logo.png';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../../slices/usersApiSlice';
import { logout } from '../../../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../store';
import SearchBox from './SearchBox';
import './header.css';
// import DarkMode from '../DarkMode/DarkMode';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { sellerInfo } = useSelector((state: RootState) => state.auth);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  const handleSellerLogin = () => { }

  return (
    <div  className='main-header'>
    <header>
      <Navbar className='main-nav' expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="Logo" className='shorpe-logo'/>
            </Navbar.Brand>
          </LinkContainer>
          {/* <DarkMode/> */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox />
              <LinkContainer to="/cart" className="header-cart-btn">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="danger" style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  {!userInfo.isSeller ? (
                    <LinkContainer to="/seller/register">
                      <NavDropdown.Item>Become A Seller</NavDropdown.Item>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/seller/dashboard">
                      <NavDropdown.Item>Seller Dashboard</NavDropdown.Item>
                    </LinkContainer>
                  )}
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminuser">
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              {sellerInfo && (
                <NavDropdown title="Seller Zone" id="adminuser">
                  <LinkContainer to="/seller/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/seller/wallet">
                    <NavDropdown.Item>wallet</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/seller/settings">
                    <NavDropdown.Item>Settings</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) 
            } 
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
    </div>
  );
};

export default Header;
