import React from 'react';
import './DynamicTable.scss'

class DynamicTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridDataStructure: [],
            userPosition: [0, 0],
            movesList: [],
            movesCount: 0,
            activeClass: 'cell_0_0',
            movesLimit: this.props.movesLimit,
            gridSize: this.props.gridSize
        }
    }

    componentWillMount() {
        window.addEventListener('keydown', this.updateMoves);
    };
    componentDidMount() {
        //Set 2D array as state value gridDataStructure
        this.getGridDataStructure();
    }

    //Returns 2D array with rows
    getGridDataStructure = () => {
        const gridDataStructure = [];
        const { gridSize } = this.state;
        let cellValues = 0;
        for (let i = 0; i < gridSize; i++) {
            const getRows = () => {
                const rows = [];
                for (let j = 0; j < gridSize; j++) {
                    rows.push(cellValues);
                    cellValues++;
                }
                return rows;
            };
            gridDataStructure.push(getRows());
        };
        this.setState({
            gridDataStructure
        })
    };

    //Changes display on user key movement
    updateMoves = (e) => {
        if (this.state.movesCount < this.state.movesLimit) {
            const userPosition = [...this.state.userPosition];
            const movesList = [...this.state.movesList];
            const gridSize = this.state.gridSize;
            let movesCount = this.state.movesCount;
            const keyCodeFunctions = {
                37: () => {
                    if (userPosition[1] > 0) {
                        userPosition[1] = (userPosition[1] - 1);
                    } else {
                        userPosition[0] = (userPosition[0] === gridSize - 1 || userPosition[0] > 0) ? (userPosition[0] - 1) : (gridSize - 1);
                        userPosition[1] = gridSize - 1;
                    };
                    return userPosition;
                },
                38: () => {
                    if (userPosition[0] > 0) {
                        userPosition[0] = (userPosition[0] - 1);
                    } else {
                        userPosition[0] = gridSize - 1;
                    };
                    return userPosition;
                },
                39: () => {
                    if (userPosition[1] < gridSize - 1) {
                        userPosition[1] = (userPosition[1] + 1);
                    } else {
                        userPosition[0] = userPosition[0] < (gridSize - 1) ? userPosition[0] + 1 : 0;
                        userPosition[1] = 0;
                    };
                    return userPosition;
                },
                40: () => {
                    if (userPosition[0] < gridSize - 1) {
                        userPosition[0] = (userPosition[0] + 1);
                    } else {
                        userPosition[0] = 0;
                    };
                    return userPosition;
                }
            };
            if (keyCodeFunctions[e.keyCode]) {
                movesCount++;
                movesList.push(keyCodeFunctions[e.keyCode]());
            };
            this.setState({
                movesList,
                userPosition,
                activeClass: `cell_${userPosition.join('_')}`,
                movesCount
            });
        } else {
            //Moves Limit exceeded page will reset
            alert('Please start again, you are out of moves');
            this.setState({
                gridDataStructure: [],
                userPosition: [0, 0],
                movesList: [],
                movesCount: 0,
                activeClass: 'cell_0_0',
                movesLimit: this.props.movesLimit,
                gridSize: this.props.gridSize
            });
            //Get 2D array
            this.getGridDataStructure();
        }
    }
    render() {
        return (
            <>
                <h5>Moves: {JSON.stringify(this.state.movesList)}</h5>
                <div className={'dynamic-table'}>
                    {
                        this.state.gridDataStructure.map((row) => (
                            <div className={'dynamic-table-row'} key={row}>
                                {row.map((cellValue) => <div className={`dynamic-table-cell ${this.state.activeClass === `cell_${this.state.gridDataStructure.indexOf(row)}_${row.indexOf(cellValue)}` && 'active'}`} id={`cell_${this.state.gridDataStructure.indexOf(row)}_${row.indexOf(cellValue)}`}>{' '}</div>)}
                            </div>
                        ))
                    }
                </div>
            </>
        );
    }
};

export default DynamicTable;