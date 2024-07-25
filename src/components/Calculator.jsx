import { useState } from "react"
import { evaluate } from 'mathjs'
import Display from "./Display"
import Keypad from "./Keypad"
import '../styles/Calculator.css'


export default function Calculator({infinity, handleAnimation}){
  const [active, setActive] = useState(false);
  const [display, setDisplay] = useState(['0']);
  const [equation, setEquation] = useState(['']);
  const [history, setHistory] = useState(['']);
  const [lastResults, setLastResults] = useState(['']);
  const [equationError, setEquationError] = useState(false);
  const [clearString, setClearString] = useState('AC');

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

        try {
          const results = evaluate(joinEquation);
          const stringResults = results.toString()

          if(stringResults.includes('Infinity')){
            handleAnimation(true);
            setEquationError(true);
            setEquation(['']);
            setDisplay('YOU REACHED INFINITY...!'.split(''))

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
        setClearString('AC')
      
        return
      }

      if(value == 'delete'){
        setDisplay(prevDisplay => {
          if (prevDisplay.length === 1) {
            setActive(false);
            return ['0'];
          }
          return prevDisplay.slice(0, -1);
        })

        setEquation(prevEquation => {
          if (prevEquation.length === 1) {
            setActive(false);
            return ['0'];
          }
          return prevEquation.slice(0, -1);
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
      if(value == 'delete'){
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
    setEquation(strings => [...strings, value]);

    if(display.length > 0){
      setClearString('C')
    }

    return
  }

  return (
    <div className="container">
      <div className="calculator">
        <Display 
          display={display}
          history={history}
        />
        <Keypad
          clearString={clearString}
          handleEquation={(event) => {handleEquation(event)}}
        />
      </div>
    </div>
  )
}