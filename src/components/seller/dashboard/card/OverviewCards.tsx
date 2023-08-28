import React from 'react'
import './OverviewCards.css'
import { Col, Row } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'

const OverviewCards = () => {
  return (
    <>
      <div className='mx-auto overview-cards'>
        <Card bg='warning'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto overview-card">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='success'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto overview-card">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='light'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto overview-card">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card bg='info'
          style={{ width: '15rem' }}
          className="mb-2 mx-auto overview-card">
          <Card.Header>Header</Card.Header>
          <Card.Body>
            <Card.Title> Card Title </Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        </div>
    </>
  )
}

export default OverviewCards