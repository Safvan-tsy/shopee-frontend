import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SellerHeader = () => {
    return (
        <header>
            <Navbar expand="md" collapseOnSelect>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to='/seller/dashboard'>
                                <Nav.Link>Dashboard</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/seller/payments'>
                                <Nav.Link>Payments</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/seller/orders'>
                                <Nav.Link>Orders</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/seller/products'>
                                <Nav.Link>Products</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to='/seller/wallet'>
                                <Nav.Link>Wallet</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <hr />
        </header>
    )
}

export default SellerHeader