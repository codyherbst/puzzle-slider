import React from 'react'
import { Container, Row, Col } from 'reactstrap'

class Tile extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let currPosition = 0
        return (
            <Container>
                {this.props.tiles.map((item, i) => (
                    <Row>
                        {item.map((jtem, j) => (
                            <React.Fragment>
                                < Col
                                    className='border'
                                    id={this.props.getTileByPos(this.props.tiles, currPosition).id}
                                    key={j} onClick={this.props.moveTile}
                                >
                                    {this.props.getTileByPos(this.props.tiles, currPosition).text}
                                </Col>
                                <div className='d-none'>{currPosition++}</div>
                            </React.Fragment>
                        ))
                        }
                    </Row>
                ))
                }
            </Container >
        )
    }

    componentDidMount() {

    }

    getTile(array, position) {
        let currTile = {}
        array.map((item) => {
            item.map(jtem => {
                if (jtem.position === position) {
                    currTile = jtem
                }
            })
        })
        // console.log(currTile)
        return currTile
    }
}

export default Tile