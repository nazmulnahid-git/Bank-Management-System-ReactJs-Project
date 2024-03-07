import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Card.css'
function Card({name, path, icon}) {
  const navigate = useNavigate();
  return (
    <div className = 'card' onClick={()=>navigate(path)} >
      <img className = 'icon' src={icon} />
      <h3 className='name'> {name} </h3>
    </div>
  )
}
export default Card
