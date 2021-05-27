import {useEffect, useState} from 'react'

const ExperienceBar = ({ balance, expNeeded }) => {

  const [style, setStyle] = useState({})

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        width: `${(balance/expNeeded) * 100}%`
      }
  
      setStyle(newStyle);
    }, 100)
  }, [balance, expNeeded])

  return (
    <>
      <div className="expbar">
        <div 
          className="expbar__fill"
          style={style}
        ></div>
        <span className="expbar__title">Player XP: {balance}/{expNeeded}</span>
      </div>
    </>
  );
}

export default ExperienceBar;