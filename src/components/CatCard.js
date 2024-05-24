import React from 'react';
import { Card, Col } from 'react-bootstrap';


function CatCard({ idx, imgSrc, name, description, origin }) {


    return (
        <Col key={idx}>
            <Card className='h-100'>
                <Card.Img variant="top" src={imgSrc} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small>{origin}</small>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default CatCard;