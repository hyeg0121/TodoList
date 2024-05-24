import { Row } from "react-bootstrap"
import CatCard from "./CatCard"

function CardContainer({ dataList }) {
    return (
        <Row xs={1} md={4} className="g-4">
            {
                dataList.map(data =>
                    <CatCard
                        key={data.id}
                        idx={data.id}
                        imgSrc={data.image.url}
                        name={data.name}
                        description={data.description}
                        origin={data.origin}
                    />
                )
            }
        </Row>
    )
}

export default CardContainer