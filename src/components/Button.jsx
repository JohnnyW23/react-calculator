import '../styles/Button.css'

export default function Button({type, screen, display, value, handleEquation}){
  return (
    <div className='button-wrapper'>
      <button
        className={type}
        display={display}
        value={value}
        onClick={handleEquation}
      >
        {screen}
      </button>
    </div>
  )
}