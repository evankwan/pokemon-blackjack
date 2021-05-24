const ExperienceBar = ({ balance }) => {
  return (
    <>
      <div className="expbar">
        <span className="expbar__title">Player XP: {balance}</span>
      </div>
    </>
  );
}

export default ExperienceBar;