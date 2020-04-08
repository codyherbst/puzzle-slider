import React from 'react'
import Tile from './Tile'
import { Container } from 'reactstrap'


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: []
        }
        this.moveTile = this.moveTile.bind(this);
        this.getTile = this.getTile.bind(this);
    }

    render() {
        return (
            <Container>
                <Tile
                    tiles={this.state.tiles}
                    moveTile={this.moveTile}
                    getTile={this.getTile}
                />
            </Container>
        )
    }

    async componentDidMount() {
        await this.buildTiles()
    }

    buildTiles() {
        let newTiles = [];
        let newTile = [];
        for (var i = 0; i < 16; i++) {
            let currTile = { position: i, text: i, id: i, isEmpty: ((i === 0) ? true : false) };

            newTile.push(currTile)
            if ((i + 1) % 4 === 0) {
                newTiles.push(newTile);
                newTile = [];
            }

        }
        this.setState(prevState => ({
            tiles: newTiles
        }))
    }

    async moveTile(e) {
        e.persist();
        e.preventDefault();
        let currTile = this.getTile(this.state.tiles, Number(e.target.id));
        let emptyTile = this.getEmptyTile();

        // console.log(currTile)
        // console.log(emptyTile)

        if (currTile.position <= 3) {
            if (currTile.position - 1 === emptyTile.position || currTile.position + 1 === emptyTile.position || currTile.position + 4 === emptyTile.position) {
                let newPosition = emptyTile.position;
                emptyTile.position = currTile.position;
                currTile.position = newPosition;
                // console.log(currTile)
            }
        } else if (currTile.position >= 12) {
            if (currTile.position - 1 === emptyTile.position || currTile.position + 1 === emptyTile.position || currTile.position - 4 === emptyTile.position) {
                let newPosition = emptyTile.position;
                emptyTile.position = currTile.position;
                currTile.position = newPosition;
            }
        } else if (currTile.position - 1 === emptyTile.position || currTile.position + 1 === emptyTile.position || currTile.position - 4 === emptyTile.position || currTile.position + 4 === emptyTile.position) {
            let newPosition = emptyTile.position;
                emptyTile.position = currTile.position;
                currTile.position = newPosition;
        }

        await this.setState(prevState => ({
            tiles: prevState.tiles.map(item => {
                item.map(jtem => {
                    if (jtem.id === currTile.id) {
                        jtem.position = currTile.position;
                        // console.log(currTile.position)
                    } else if (jtem.id === emptyTile.id) {
                        jtem.position = emptyTile.position;
                    }
                    return jtem;
                })
                return item;
            })


            // console.log(currTile)
            // console.log(leftTile)
        }))
    }

    getTile(array, id) {
        let currTile = {};
        array.map((item) => {
            item.map(jtem => {
                if (jtem.id === id) {
                    currTile = jtem;
                }
            })
        })
        return currTile;
    }

    getEmptyTile() {
        let emptyTile = {};
        this.state.tiles.map((item) => {
            item.map(jtem => {
                if (jtem.isEmpty) {
                    emptyTile = jtem;
                }
            })
        })
        return emptyTile;
    }
}

export default Board;