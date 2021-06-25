import React, { Component } from 'react';
import Btn from './BtnComponent';
import InOut from './InOutComponent';

class Main extends Component {
    constructor(props) {
        super(props);

        this.initialState = {
            calInput: '',
            calOutput: '',
        }

        this.numArr = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '0', '.'];
        this.operatorArr = ['*', '/', '%', '+', '-',];

        this.state = this.initialState;
        this.handleNumClick = this.handleNumClick.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handlePop = this.handlePop.bind(this);
        this.handleOperClick = this.handleOperClick.bind(this);
        this.handleInChange = this.handleInChange.bind(this);
        this.handleEqual = this.handleEqual.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    async handleInChange(e) {
        if (!this.numArr.includes(e[e.length - 1]) && !this.operatorArr.includes(e[e.length - 1])) {
            this.setState({ calInput: '' , calOutput: ''})
            return;
        }

        if (e.length === 1) {
            const opeCheck = this.operatorArr.filter((ele) => ele !== '-')
            if (opeCheck.includes(e[0]))
                return;
        }

        if (this.operatorArr.includes(e[e.length - 1])) {
            if (this.operatorArr.includes(e[e.length - 2])) {
                e = e.slice(0, -2).concat(e[e.length - 1]);
            }
        }

        await this.setState({ calInput: e });

        const staIn = this.state.calInput;

        if (staIn.length === 2) {
            if (staIn[0] === '0') {
                if (this.numArr.includes(staIn[1]))
                    this.setState({ calInput: staIn[1] })
            }
        }

        let outval = ''

        if (this.operatorArr.includes(staIn[staIn.length - 1])) {
            outval = this.expEval(staIn.slice(0, staIn.length - 1))
        }
        else {
            outval = this.expEval(staIn);
        }
        await this.setState({ calOutput: outval });
    }

    handleNumClick(e) {
        this.handleInChange(this.state.calInput.concat(e));
    }

    handleOperClick(e) {
        this.handleInChange(this.state.calInput.concat(e))
    }

    handleClear() {
        this.setState(this.initialState);
    }

    handlePop() {
        this.setState({ calInput: this.state.calInput.slice(0, -1) });
        //this.handleInChange(this.state.calInput.slice(0, -1) )
    }


    handleEqual() {
        this.setState({ calInput: this.state.calOutput.toString(), calOutput: '' });
    }

    handleKeyPress(e) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            e.preventDefault();
        }

        if(e.key === '=' || e.key === 'Enter'){
            this.handleEqual();
        }
    }
    expEval(exp) {

        let arr = exp.split('');
        let tempInd = 0;
        let numOpArr = [];
        let onlyNum = true;
        for (const [index, value] of arr.entries()) {
            let x = this.operatorArr.indexOf(value);
            if (x !== -1) {
                numOpArr.push(arr.slice(tempInd, index).join(''));
                numOpArr.push(this.operatorArr[x]);
                tempInd = index + 1;
                onlyNum = false;
            }
        }

        if (onlyNum) {
            return '';
        }

        let lastEle = arr.slice(tempInd, arr.length);
        numOpArr.push(lastEle.join(''));

        for (const j of this.operatorArr) {
            while (numOpArr.indexOf(j) !== -1) {
                const opIndex = numOpArr.indexOf(j);
                const oparend1 = Number(numOpArr[opIndex - 1]);
                const oparend2 = Number(numOpArr[opIndex + 1]);
                let opeValue = ''
                switch (j) {
                    case '*':
                        opeValue = oparend1 * oparend2;
                        break;
                    case '/':
                        if (oparend1 === 0 && oparend2 === 0) {
                            opeValue = 'Not valid';
                        }
                        else {
                            opeValue = oparend1 / oparend2;
                        }
                        break;
                    case '%':
                        opeValue = oparend1 % oparend2;
                        break;
                    case '+':
                        opeValue = oparend1 + oparend2;
                        break;
                    case '-':
                        opeValue = oparend1 - oparend2;
                        break;
                    default:
                        opeValue = ''
                }

                numOpArr.splice(opIndex - 1, 3, opeValue);
            }
        }

        return numOpArr[0];
    }

    render() {

        return (
            <div className='main'>
                <h1 className='pageHeading' >Calculator</h1>
                <InOut
                    calInput={this.state.calInput}
                    calOutput={this.state.calOutput}
                    handleInChange={this.handleInChange}
                    handleKeyPress={this.handleKeyPress}
                />

                <Btn handleNumClick={this.handleNumClick}
                    handleOperClick={this.handleOperClick}
                    handleClear={this.handleClear}
                    handlePop={this.handlePop}
                    numArr={this.numArr}
                    operatorArr={this.operatorArr}
                    handleEqual={this.handleEqual}
                />
            </div>
        )
    }
}

export default Main;