import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../ui/Rating";
import './product.css'

const Product = ({ product }) => {
    return (
        <Card className="mt-3 product-card">
            <Link to={`/product/${product._id}`}>
                <Card.Img className="product-img" src={product.image[0]} />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`} >
                    <Card.Title as='div' className="product-title">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>
                <Card.Text as="div">
                    <Rating value={product.rating}
                        text={`${product.numReviews} reviews`} />
                </Card.Text>
                <Card.Text as='h3'>
                    ₹{product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product