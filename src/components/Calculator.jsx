import { useState } from "react"
import { evaluate } from 'mathjs'
import Display from "./Display"
import Keypad from "./Keypad"
import '../styles/Calculator.css'

export default function Calculator({infinity, handleAnimation, handleTheme}){
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(['0']);
  const [equation, setEquation] = useState(['']);
  const [history, setHistory] = useState(['']);
  const [lastResults, setLastResults] = useState(['']);
  const [equationError, setEquationError] = useState(false);
  const [foreseer, setForeseer] = useState([''])
  const [clearString, setClearString] = useState('AC');
  const numbers = '0123456789^(-1)/100';

  const handleEquation = (event) => {
    const stringD = event.target.getAttribute('display');
    const value = event.target.getAttribute('value');

    if(equationError && value != 'clear'){
      return
    }

    if(active){

      if(value == 'equal'){
        if (display.length === lastResults.length) {
          for (let i = 0; i < display.length; i++) {
            if (display[i] !== lastResults[i]) {
              break;
            }
            if(i == display.length - 1){
              return
            }
          }
        }

        setHistory(prevHistory => [...prevHistory, display]);

        const joinEquation = equation.join('');

        setForeseer([''])

        try {
          const results = evaluate(joinEquation);
          const stringResults = results.toString()

          if(stringResults.includes('Infinity')){
            handleAnimation(true);
            setEquationError(true);
            setEquation(['']);
            setDisplay('INFINITY!'.split(''))

          }else{
            setEquation(stringResults.split(''));
            setDisplay(stringResults.split(''));
            setLastResults(stringResults.split(''));
          }

        } catch (error) {
          setEquationError(true)
          setDisplay('Error'.split(''));
          setEquation([''])
        }

        return
      }

      if(value == 'clear'){
        if(infinity){
          handleAnimation(false);
        }
        
        if(equationError){
          setEquationError(false);
        }

        setActive(false);
        setDisplay(['0']);
        setEquation(['']);
        setForeseer([''])
        setClearString('AC')

        return
      }

      if(value == 'delete'){
        setDisplay(prevDisplay => {
          if (prevDisplay.length === 1) {
            setActive(false);
            setClearString('AC')
            setForeseer([''])
            return ['0'];
          }
          return prevDisplay.slice(0, -1);
        })

        setEquation(prevEquation => {
          if (prevEquation.length === 1) {
            setActive(false);
            return ['0'];
          }
          const newEquation = prevEquation.slice(0, -1);
          if(numbers.includes(newEquation[newEquation.length - 1])){
            setForeseer(newEquation);
          }
          return newEquation;
        })

        return
      }

    }else{
      if(value == 'clear'){

        if(history.length >= 1){
          setHistory([''])
        }

        return
      }
      if(value == 'delete' || value == 'equal'){
        return
      }
    }

    if(!active && stringD == '0'){
      return
    }

    if(!active){
      setActive(true);
      setDisplay([]);
    }

    setDisplay(strings => [...strings, stringD]);

    const newEquation = [...equation, value]
    setEquation(newEquation);

    if(numbers.includes(newEquation[newEquation.length - 1])){
      handleForeseer(newEquation);
    }

    if(display.length > 0){
      setClearString('C')
    }
  }

  const handleForeseer = (equation) => {
    try{
      const newForeseer = evaluate(equation.join(''));
      if(isNaN(newForeseer)){
        setForeseer('NaN'.split(''))

      }else{
        setForeseer(newForeseer)
      }

    } catch(error) {

    }
  }

  return (
    <div className="container">
      <div className="calculator">
        <Display 
          display={display}
          history={history}
          foreseer={foreseer}
          handleTheme={handleTheme}
        />
        <Keypad
          clearString={clearString}
          handleEquation={(event) => {handleEquation(event)}}
        />
      </div>
    </div>
  )
}