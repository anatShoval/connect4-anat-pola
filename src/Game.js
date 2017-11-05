import React, { Component } from 'react';
import './App.css';
import Board from './Board';
//import RadioBtn from './RadioBtn';

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
        selectedOption: 8,
      };
    }

    handleOptionChange(changeEvent) {
      this.setState({
        numSquares: changeEvent.target.value,
        history: [{
          squares: Array(changeEvent.target.value*changeEvent.target.value).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        selectedOption: changeEvent.target.value,
      });

      this.resetMySquares(1);
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

      let d = document.getElementById('button'+(i));
      
      console.log(document.getElementById('button'+(i)));//.target.getAttribute('id'));
      
      
      if(this.state.xIsNext){
        d.className += " redSquare";
        squares[i] = 'X';
      }
      else{
        d.className += " yellowSquare";
        squares[i] = 'O';
      }
      

      //squares[i] = this.state.xIsNext ? 'X' : 'O';
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
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              numSquares={this.state.numSquares}
              selectedOption={this.state.selectedOption}
              onChange={(changeEvent) => this.handleOptionChange(changeEvent)}
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
    
    const strike = [0, 0, 0, 0];
    const sqrNum =  numberLines*numberLines;

    let lines = [];
    for(var i=0; i<sqrNum*4; i++) {
      lines[i] = new Array(4);
    }

    // horizontal coordinate
    for(let h = 0; h < sqrNum; h++){
      for(let s = 0; s<(strike.length); s++){
          lines[h][s] = h+s;
      }
    }
    console.log(lines.length)
    let lArray =  sqrNum;

    // vertical coordinate
    for(let v = 0; v < sqrNum; v++){
      for(let st = 0; st<(strike.length); st++){
        lines[lArray][st] = v + (st*numberLines);
        
      }
      lArray++;
    }

    // diagonal descending coordinate
    for(let d = 0; d < sqrNum; d++){
      for(let str = 0; str<(strike.length); str++){
        lines[lArray][str] = d + (str*(numberLines+1));
      }
      lArray++;
    }

    //Ascending diagonal coordinate
    for(let ad = 0; ad < sqrNum; ad++){
      for(let stri = 0; stri<(strike.length); stri++){
        lines[lArray][stri] = ad + (stri*(numberLines-1));
      }
      lArray++;
    }

    console.log(lines);

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    return null;
  }


