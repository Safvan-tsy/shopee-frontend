import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import React from 'react'

const product = ({ product }) => {
    return (
        <Card>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`} >
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default product