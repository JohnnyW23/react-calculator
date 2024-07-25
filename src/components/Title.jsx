import '../styles/Title.css'

export default function Title({animationStyle}){

  return (
    <header>
      <div className='container'>
        <div className='title'>
          <div className='logo' style={animationStyle}>
            <div className='logo-mask'></div>
          </div>
          <div className='title-text'>
            <h2>React</h2>
            <h1>Calculator App</h1>
            <h3>Made by <a href='https://github.com/JohnnyW23' target='_blank'>Davi Nascimento</a></h3>
        </div>
        </div>
      </div>
    </header>
  )
}