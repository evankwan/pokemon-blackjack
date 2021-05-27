import {useEffect, useState} from 'react'

// dispalys the experience bar at the top of the screen
const ExperienceBar = ({ balance, expNeeded }) => {

  const [style, setStyle] = useState({})

  // update the experience bar when balance is adjusted
  useEffect(() => {
    setTimeout(() => {
      // sets width based on % of exp needed
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