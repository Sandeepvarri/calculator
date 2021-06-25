import React, { Component } from 'react';

class Btn extends Component {
    render() {

        const numEle = this.props.numArr.map((ele) => {
            return (
                <button key={ele} className='ind-num-btns' value={ele} onClick={(e) => this.props.handleNumClick(e.target.value)}>{ele}</button>)
        });


        const operatorEle = this.props.operatorArr.map((ele) => {
            return (
                <button key={ele} className='ind-op-btns' value={ele} onClick={(e) => this.props.handleOperClick(e.target.value)}>{ele}</button>
            )
        });

        return (
            <div className='btns'>
                <div className='num-other-container'>
                    <div className='other-btn-container'>
                        <button className='ind-oth-btn' onClick={this.props.handleClear}>AC</button>
                        <button className='ind-oth-btn' onClick={this.props.handlePop}> &larr; </button>
                        <button className='ind-oth-btn' onClick={this.props.handleEqual}> = </button>
                    </div>
                    <div className='numbers-container'>
                        {numEle}
                    </div>
                </div>
                <div className='operations-container'>
                    {operatorEle}
                </div>
            </div>
        )
    }
}

export default Btn;