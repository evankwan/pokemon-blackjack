import {useEffect, useState} from 'react'

const ExperienceBar = ({ balance }) => {

  const [style, setStyle] = useState({})

  useEffect(() => {
    setTimeout(() => {
      const newStyle = {
        width: `${(balance/10)}%`
      }
  
      setStyle(newStyle);
    }, 100)
  }, [balance])

  return (
    <>
      <div className="expbar">
        <div 
          className="expbar__fill"
          style={style}
        ></div>
        <span className="expbar__title">Exp pts: {balance}/1000</span>
      </div>
    </>
  );
}

export default ExperienceBar;