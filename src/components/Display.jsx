import { v4 as uuidv4 } from 'uuid'
import '../styles/Display.css'

export default function Display({display, history}){

  return (

      <div className='display'>
        <div className='input'>
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
          <p className='active'>{display}</p>
        </div>
      </div>
  )
}