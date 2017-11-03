import React, { Component } from 'react';
import './App.css';
import Board from './Board';

export default class Game extends React.Component {
    constructor(props) {
      super(props);
      const numSquares = 8;
      this.state = {
        history: [{
          squares: Array(numSquares*numSquares).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      let d = document.getElementById('button'+(i));

      if (calculateWinner(squares) || squares[i]) {
        return;
      }
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

      const history = this.state.history.slice(0, step+1);
      const current = history[history.length-1];
      const squares = current.squares.slice();
      
      for(let i=63; i>0; i--){
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
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
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
    
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c, d] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d]) {
        return squares[a];
      }
    }
    return null;
  }


