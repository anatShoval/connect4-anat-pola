import React from 'react';
import './App.css';
import Square from './Square';

export default class Board extends React.Component { 

    renderSquare(sqrValue, sqrLine) {
      const idName = "button" + sqrValue
      const value = this.props.squares[sqrValue]
      return (
        <Square
          id = {idName}
          className = {value ? value==='X' ? "square redSquare" : "square yellowSquare" : "square"}
          value = {this.props.squares[sqrValue]}
          onClick = {() => this.props.onClick(sqrValue)}
        />
      );
    }
  
   objectSquares(num){
        let contentSquares = [];
          let valSquare = 0;
          for(let i=0; i<num; i++){
            const arraySquare = [];
            for(let j=0; j<num; j++){
              arraySquare.push(this.renderSquare(valSquare, j));
              valSquare++;
            }
            contentSquares.push(React.createElement('dir', {className:'board-row'}, ...arraySquare));
          }
        return React.createElement('dir', null, ...contentSquares);
      }
    render() {
      const numSquares = this.props.numSquares;
      
      console.log(numSquares);
      return (
        <div>
          
          <div className="boardDiv">
            {this.objectSquares(numSquares)};
          </div>
        </div>
      );
    }
  }