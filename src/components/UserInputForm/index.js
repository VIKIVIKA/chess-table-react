import React from 'react';
import './UserInputForm.scss';

class UserInputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridSize: 0,
            movesLimit: 0
        }
    };
    updateLimits = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    getTable = () => {
        this.props.getTable(this.state.gridSize, this.state.movesLimit);
    }
    render() {
        return (
            <>
                <input className={'form-fields'} type='number' onChange={(e) => this.updateLimits(e)} value={this.state.gridSize} name="gridSize" />
                <input className={'form-fields'} type='number' onChange={(e) => this.updateLimits(e)} value={this.state.movesLimit} name="movesLimit" />
                <button className={'play-btn'} onClick={this.getTable}>Play Chess</button>
            </>
        );
    }
};

export default UserInputForm;