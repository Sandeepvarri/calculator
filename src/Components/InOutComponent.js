import React, { Component } from 'react';

class InOut extends Component {

    render() {
        return (
            <div className='in-out-container'>
                <input autoFocus type='text' name='calInput' className='calInput' value={this.props.calInput}
                    onChange={(e) => this.props.handleInChange(e.target.value)}
                    onKeyDown={(e) => this.props.handleKeyPress(e)}
                    placeholder='Input'
                />
                <input type='text' name='calOutput' className='calOutput'
                    placeholder = 'Output'
                    value={this.props.calOutput} readOnly />
            </div>
        )
    }
}

export default InOut;