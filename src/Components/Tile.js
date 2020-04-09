import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import './Tile.css'

class Tile extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let currPosition = 0
        return (
            <Container>
                {this.props.tiles.map((item, i) => (
                    <Row style={{ width: 400 }}>
                        {item.map((jtem, j) => (
                            <React.Fragment>
                                <Col
                                    className='border'
                                    id={this.props.getTileByPos(this.props.tiles, currPosition).id}
                                    key={this.props.getTileByPos(this.props.tiles, currPosition).id}
                                    style={{ width: 100, maxHeight:100, position: 'relative', overflow: 'hidden' }}
                                >
                                        <img
                                            src='Images/logo512.png'
                                            onClick={this.props.moveTile}
                                            style={{
                                                left: ((-100 * this.props.getTileByPos(this.props.tiles, currPosition).padLeft) - 15) + 'px',
                                                top: -100 * this.props.getTileByPos(this.props.tiles, currPosition).padTop + 'px',
                                                position: 'hidden',
                                                overflow: 'hidden'
                                            }}
                                            className={this.props.getTileByPos(this.props.tiles, currPosition).isEmpty ? 'd-none' : 'd-block'}
                                        />
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
}

export default Tile