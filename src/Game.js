import React, { Component } from 'react';
import './App.css';
import Board from './Board';
import RadioBtns from './RadioBtns';

export default class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        numSquares: 8,
        history: [{
          squares: Array(8*8).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }

    handleOptionChange(value) {
      
      this.setState({
        numSquares: value,
        history: [{
          squares: Array(value*value).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      });

      //this.resetMySquares(1);
    }

    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const lineSelected = parseInt(this.state.numSquares);
      const winner = calculateWinner(current.squares, lineSelected);
      const lowerPlace = lineSelected*lineSelected -lineSelected;
      let myTest = false;

      if(winner || squares[i]){
        return
      }

      while(myTest===false){
        console.log(squares[i]);
        if((i<lowerPlace) && (!squares[i+lineSelected])){
          
          i=i+lineSelected;
          console.log("i = "+i);
        }
        else{
          console.log(i);
          myTest =true;
        }

      }

      squares[i] = this.state.xIsNext ? 'X': 'O';

      this.setState({
        history: history.concat([{
          squares: squares,
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
    
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });

      this.resetMySquares(step);
    }

    resetMySquares(step){
      const history = this.state.history.slice(0, step+1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      
      for(let i=squares.length-1; i>-1; i--){
        let d = document.getElementById('button'+i);
        if(!squares[i]){
            d.classList.remove('redSquare');
            d.classList.remove('yellowSquare');
        }
        else if(squares[i]==='X'){
          if(!d.classList.contains('redSquare')){
            d.className += " redSquare";
          }
        }
        else{
          if(!d.classList.contains('yellowSquare')){
            d.className += " yellowSquare";
          }
        }
      }
    }
  
    
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const numberLines = this.state.numSquares;
      const winner = calculateWinner(current.squares, numberLines);
      
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li  key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });
      
      let status;
      if (winner) {
        status = 'Winner: ' + winner;

      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      return (
        <div className="game">
          <div className="game-board">
            <RadioBtns
              //selectedOption={this.state.selectedOption}
              onChange={(value) => this.handleOptionChange(value)}
            />
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              numSquares={this.state.numSquares}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares, numberLines) {
    
    let lines = [];
    let addLength = (numberLines-3) * numberLines
    for(var i=0; i<numberLines*numberLines*4; i++) {
      lines[i] = new Array(4);
    }

    // horizontal coordinate
    let myCounter = 0;
    for(let h = 0; h < numberLines*numberLines; h++){ 
      if(h+4<numberLines*numberLines){
        for(let s = 0; s<4; s++){
          lines[myCounter][s] = h+s;
        }
        myCounter++;
        if((((myCounter)%(numberLines-3)) === 0))
        {
          h+=3;
        }
      }  
        
    }

    // vertical coordinate
    for(let v = 0; v < numberLines*numberLines; v++){
      if(v+(3*numberLines) < numberLines*numberLines){
        for(let st = 0; st<4; st++){
          lines[myCounter][st] = v + (st*numberLines);
        }
        myCounter++;
      }
    }

    // diagonal descending coordinate
    for(let d = 0; d < numberLines*numberLines; d++){
      if(d+(3*(numberLines+1)) < numberLines*numberLines){
        for(let str = 0; str<4; str++){
          lines[myCounter][str] = d + (str*(numberLines+1));
        }
        myCounter++;
      }
    }

    //Ascending diagonal coordinate
    for(let ad = 0; ad < numberLines*numberLines; ad++){
      if(ad+(3*(numberLines-1)) < numberLines*numberLines){
        for(let stri = 0; stri<4; stri++){
          lines[myCounter][stri] = ad + (stri*(numberLines-1));
        }
        myCounter++;
      }
    }

    const slicedLines = lines.slice(0, myCounter);

    console.log(slicedLines)

    //Check if there's a winner and if so return 'X' / 'O' else return null.
    for (let i = 0; i < slicedLines.length; i++) {
      const [a, b, c, d] = slicedLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && d < numberLines*numberLines-1) {
        return squares[a];
      }
    }
    return null;
  }


