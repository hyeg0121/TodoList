import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';


function CatCard({ idx, data }) {


    return (
        <Col key={idx}>
            <Card>
                <Card.Img variant="top" src={data.image.url} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <Card.Text>
                        <ul>
                            <li>지역: {data.origin}</li>
                            <li>적응력: {data.adaptability}</li>
                            <li>지능: {data.intelligence}</li>
                        </ul>
                    </Card.Text>
                    <Button variant="primary">자세히 보기</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default CatCard;