import { Container,Row, Col } from "react-bootstrap";


const Footer = () => {
    const currentYear = new Date().getFullYear()
    const footerStyle = {
        backgroundColor: "#78c4ed",
        borderRadius:"1rem 1rem 0 0"
      };
    
      return (
        <footer style={footerStyle}>
        <Container>
            <Row>
                <Col className="text-center py-3">
                    <p>Shorpee &copy; {currentYear}</p>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer