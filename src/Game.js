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
        if((i<lowerPlace) && (!squares[i+lineSelected])){
          
          i=i+lineSelected;
        }
        else{
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
      const winner = calculateWinner(current.squares);
      
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

  function calculateWinner(squares) {
    //return X / O / null
    if(diagonalDescending(squares)) return diagonalDescending(squares);
    else if(checkAscendingDiagonalLeftToRight(squares)) return checkAscendingDiagonalLeftToRight(squares);
    else if(horizontalCheck(squares)) return horizontalCheck(squares);
    else if(verticalCheck(squares)) return verticalCheck(squares); 
    else return null;    
  }

//Ascending diagonal coordinate
const checkAscendingDiagonalLeftToRight = (squares) =>{
  //return X / O / null
  let valTocheck;
  let counter = 1;
  const n = Math.sqrt(squares.length)
  for(let i = 0; i < n-3; i++){
    valTocheck = squares[i];       
      for(let j=i+n+1; j < squares.length; j +=n+1 ){
          if(squares[j] && valTocheck===squares[j]){
            counter++;
            if(counter>3) return valTocheck;
          }
          else{
            counter = 1;
            valTocheck = squares[j]
          }
     }
  }
  for(let i = n; i < n*(n-3); i+=n){
    valTocheck = squares[i];       
      for(let j=i+n+1; j < squares.length; j +=n+1 ){
          if(squares[j] && valTocheck===squares[j]){
            counter++;
            if(counter>3) return valTocheck;
          }
          else{
            counter = 1;
            valTocheck = squares[j]
          }
     }
  }
  return null
}
// diagonal descending coordinate
const diagonalDescending = (squares) =>{
  //return X / O / null
  let valTocheck;
  let counter = 1;
  const n = Math.sqrt(squares.length)
  for(let i = 2; i < n; i++){
    valTocheck = squares[i];       
      for(let j=i+n-1; j < squares.length; j +=n-1 ){
          if(squares[j] && valTocheck===squares[j]){
            counter++;
            if(counter>3) return valTocheck;
          }
          else{
            counter = 1;
            valTocheck = squares[j]
          }
     }
  }
  for(let i = n; i < n*(n-3); i+=n){
    valTocheck = squares[i];       
      for(let j=i+n-1; j < squares.length; j +=n-1 ){
          if(squares[j] && valTocheck===squares[j]){
            counter++;
            if(counter>3) return valTocheck;
          }
          else{
            counter = 1;
            valTocheck = squares[j]
          }
     }
  }
  return null
}
// horizontal coordinate
const horizontalCheck = (squares) =>{
  let valTocheck;
  let counter = 1;
  const n = Math.sqrt(squares.length)
  
  for(let i = 0; i < n-3; i++){
    valTocheck = squares[i];       
      for(let j=i+1; j < squares.length; j++ ){
          if(squares[j] && valTocheck===squares[j]){
            counter++;
            if(counter > 3) return valTocheck;
          }
          else{
            counter = 1;
            valTocheck = squares[j]
          }
     }
  }
  return null
}
// vertical coordinate
const verticalCheck = (squares) =>{
  let valTocheck;
  let counter = 1;
  const n = Math.sqrt(squares.length)
  
  for(let i = 0; i < n; i++){
    valTocheck = squares[i];       
      for(let j=i+n; j < squares.length; j +=n ){
          if(squares[j] && valTocheck===squares[j]){
            counter++;
            if(counter>3) return valTocheck;
          }
          else{
            counter = 1;
            valTocheck = squares[j]
          }
     }
  }
  for(let i = n; i < n*(n-3); i+=n){
    valTocheck = squares[i];       
      for(let j=i+n; j < squares.length; j +=n ){
          if(squares[j] && valTocheck===squares[j]){
            counter++;
            if(counter>3) return valTocheck;
          }
          else{
            counter = 1;
            valTocheck = squares[j]
          }
     }
  }
  return null
}

