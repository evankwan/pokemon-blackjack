import './DocErrorModal.css';

const DocErrorModal = ({ show }) => {
  const handleClick = () => {
    window.location.reload();    
  }
  return (
    <>
      <aside className={`modal${show ? ' show' : ''}`}>
        <header className="modal__header">
          <h2 className="modal__header-text">Oops!</h2>
        </header>
        <div className="modal__body">
          <p className="modal__body-text">
            It looks like we had trouble dealing your cards. Please try again!
          </p>
          <div className="modal__buttons">
            <button className="btn" onClick={handleClick}>
              Reload
            </button>
          </div>
        </div>
      </aside>
      <div className={`bg-overlay${show ? ' show' : ''}`}></div>
    </>
  );
};

export default DocErrorModal;
