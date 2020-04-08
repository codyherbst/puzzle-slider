import React from 'react'
import Tile from './Tile'
import { Container } from 'reactstrap'


class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
        }
        this.gameWin = false;
        this.moveTile = this.moveTile.bind(this);
        this.getTileByID = this.getTileByID.bind(this);
        this.getTileByPos = this.getTileByPos.bind(this);
    }

    render() {
        return (
            <Container>
                <Tile
                    tiles={this.state.tiles}
                    moveTile={this.moveTile}
                    getTileByPos={this.getTileByPos}
                />
            </Container>
        )
    }

    async componentDidMount() {
        await this.buildTiles()
        this.randomizeTiles()
    }

    componentDidUpdate() {
        this.checkWin();
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

    async moveTile(e, newTile) {
        let currTile = null;
        if (e != null) {
            e.persist();
            e.preventDefault();
            currTile = this.getTileByID(this.state.tiles, Number(e.target.id));
        } else if (e === null) {
            currTile = newTile
        }
        let emptyTile = this.getEmptyTile();

        if (currTile.position - 1 === emptyTile.position ||
            currTile.position + 1 === emptyTile.position ||
            currTile.position - 4 === emptyTile.position ||
            currTile.position + 4 === emptyTile.position) {

            let newPosition = emptyTile.position;
            emptyTile.position = currTile.position;
            currTile.position = newPosition;
        }

        await this.setState(prevState => ({
            tiles: prevState.tiles.map(item => {
                item.map(jtem => {
                    if (jtem.id === currTile.id) {
                        jtem.position = currTile.position;
                    } else if (jtem.id === emptyTile.id) {
                        jtem.position = emptyTile.position;
                    }
                    return jtem;
                })
                return item;
            })
        }))
    }

    randomizeTiles() {
        let emptyTile = this.getEmptyTile()

        for (let i = 0; i < 1; i++) {
            let leftTile = this.getTileByPos(this.state.tiles, emptyTile.position - 1)
            let rightTile = this.getTileByPos(this.state.tiles, emptyTile.position + 1)
            let topTile = this.getTileByPos(this.state.tiles, emptyTile.position - 4)
            let botTile = this.getTileByPos(this.state.tiles, emptyTile.position + 4)

            let randomTiles = [leftTile, rightTile, topTile, botTile]
            randomTiles = randomTiles.filter(item => {
                if (item.position) {
                    return item
                }
            })

            let randomTile = randomTiles[Math.floor(Math.random() * Math.floor(randomTiles.length))];
            this.moveTile(null, randomTile)
        }
    }

    checkWin() {
        let positionCount = 0;
        this.state.tiles.map(item => {
            item.map(jtem => {
                if (jtem.position === jtem.id) {
                    positionCount++
                }
            })
        })

        if (positionCount === 16) {
            console.log('you win!')
            this.gameWin = true;
        }
    }

    getTileByID(array, id) {
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

    getTileByPos(array, position) {
        let currTile = {}
        array.map((item) => {
            item.map(jtem => {
                if (jtem.position === position) {
                    currTile = jtem
                }
            })
        })
        return currTile
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