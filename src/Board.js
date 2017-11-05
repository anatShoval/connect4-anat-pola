import React from 'react';
import './App.css';
import Square from './Square';
//import RadioBtn from './RadioBtn';

export default class Board extends React.Component { 

    renderSquare(sqrValue, sqrLine) {
      const idName = "button" + sqrValue
      return (
        <Square
          id = {idName}
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
      const selectedOption = this.props.selectedOption;
      const handleOptionChange = this.handleOptionChange;
      let setOnChange = () => this.props.onChange;
      
      console.log(numSquares);
      return (
        <div>
          <div className="RadioBtnDiv">
          <div className="radio">
          <label>
            <input type="radio" name='radio' value="4" onChange = {setOnChange(4)} />
           Bourd 4 * 4
          </label>
        </div>
        <div className="radio">
          <label>
          <input type="radio" name='radio' value="6" onChange = {setOnChange(6)} />
            Bourd 6 * 6
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name='radio' value="8" onChange = {setOnChange(8)} />
            Bourd 8 * 8
          </label>          
        </div>
        </div>
          <div className="boardDiv">
            {this.objectSquares(numSquares)};
          </div>
        </div>
      );
    }
  }