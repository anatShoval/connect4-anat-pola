import React from 'react';
import './App.css';
import Square from './Square';


export default class Board extends React.Component { 
    renderSquare(sqrValue, sqrLine) {
      const idName = "button" + sqrValue //+ sqrLine + "_" + sqrValue;
      return (
        <Square
          id = {idName}
          value = {this.props.squares[sqrValue]}//{sqrLine + "_" + sqrValue}//{this.props.squares[sqrValue]}
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
      
      return (
        <div>
          {this.objectSquares(8)};
        </div>
      );
    }
  }