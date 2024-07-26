import { useState } from 'react'
import Title from './Title'
import Calculator from './Calculator'
import '../styles/App.css'

export default function App(){
  const [theme, setTheme] = useState('dark-theme');
  const [animation, setAnimation] = useState({infinity: false, style: {'animation': 'spin 20s linear 0s infinite'}});

  const handleAnimation = (infinity) => {
    if(infinity){
      setAnimation({infinity: true, style: {'animation': 'spin .5s linear 0s infinite'}});

    }else{
      setAnimation({infinity: false, style: {'animation': 'spin 20s linear 0s infinite'}});
    }
  }

  const handleTheme = () => {
    if(theme == 'dark-theme')
      setTheme('light-theme')
    else
      setTheme('dark-theme')
  }

  return (
    <div className={'app ' + theme}>
      <Title
        animationStyle={animation.style}
      />
      <Calculator
        infinity={animation.infinity}
        handleAnimation={(value) => {handleAnimation(value)}}
        handleTheme={() => {handleTheme()}}
      />
    </div>
  )
}
