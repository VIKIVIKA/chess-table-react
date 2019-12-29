import React from 'react';
import DynamicTable from '../DynamicTable';
import UserInputForm from '../UserInputForm';

class ChessGrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridSize: 0,
            movesLimit: 0,
            showChessTable: false
        }
    };
    getTable = (gridSize, movesLimit) => {
        if (gridSize > 0 && movesLimit > 0) {
            this.setState({
                gridSize,
                movesLimit,
                showChessTable: true
            });
        };
    }
    render() {
        return (
            <div>
                {!this.state.showChessTable && <UserInputForm getTable={this.getTable} />}
                {this.state.showChessTable && <DynamicTable gridSize={this.state.gridSize} movesLimit={this.state.movesLimit} />}
            </div>
        );
    }
};

export default ChessGrid;