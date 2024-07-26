import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'
import '../styles/Display.css'

export default function Display({display, history, foreseer, handleTheme}){

  return (

      <div className='display'>
        <FontAwesomeIcon
          className='set-theme'
          icon={faCircleHalfStroke}
          onClick={handleTheme}
        />
        <div
          className='input'
        >
          {
            history.map(previous => {
              return (
                <p
                  className='previous'
                  key={uuidv4()}
                >
                  {previous}
                </p>
              )
            })
          }
          <p
            className='active'
          >
            {display}
          </p>
          <p className='foreseer'>{foreseer}</p>
        </div>
      </div>
  )
}