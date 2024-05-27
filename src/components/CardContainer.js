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
                        data={data}
                    />
                )
            }
        </Row>
    )
}

export default CardContainer