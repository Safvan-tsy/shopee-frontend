import React from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

const OverviewCards = () => {
  return (
    <>
    <Row className='mx-auto'>
      <Col md={3}>
        <Card bg='warning'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg='success'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg='light'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card bg='info'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      </Row>
    </>
  )
}

export default OverviewCards