import './App.css';
import ActionBtn from './components/ActionBtn';
import Title from './components/Title'
import ExperienceBar from './components/ExperienceBar'
import GameMessage from './components/GameMessage';
import Dealer from './components/Dealer';
import Player from './components/Player';
import DealAgainButton from './components/DealAgainButton';
import DocErrorModal from './components/DocErrorModal';
import usePokemonBlackjack from './hooks/usePokemonBlackjack';

function App() {
  
  const {
    dealerPokemon,
    playerPokemon,
    currentDeck,
    dealerHand,
    playerHand,
    gameState,
    currentPlayer,
    currentMessage,
    currentBet,
    balance,
    experienceNeeded,
    buttonsHidden,
    error,
    handleGameStart,
    handleDeal,
    handleHit,
    handleDouble,
    handleStand,
    dealAgain,
  } = usePokemonBlackjack();

  return (
    <>
      {
        // if the game is not running, render title screen
        !gameState ? (
          <Title
            startGame={handleGameStart}
            deckLoaded={currentDeck && currentDeck.length > 0}
          />
        ) : (
          // if the game is running, render game UI
          <>
            <div className="gameBoard">
              <div className="wrapper">
                <ExperienceBar balance={balance} expNeeded={experienceNeeded} />

                <Dealer
                  hand={dealerHand}
                  dealerPokemon={dealerPokemon}
                  currentTurn={currentPlayer}
                  currentBet={currentBet}
                />
                {/* GameMessage updates the message in the middle of the screen */}
                <GameMessage message={currentMessage} />

                {playerPokemon.length > 0 ? (
                  <Player
                    hand={playerHand}
                    playerPokemon={playerPokemon}
                    currentBet={currentBet}
                  />
                ) : null}

                <div className="actions">
                  {/* only show deal when game state is false */}
                  {playerHand.length === 0 ? (
                    <ActionBtn
                      name={'Deal'}
                      className={'btn btn__deal'}
                      handleClick={handleDeal}
                    />
                  ) : (
                    <div className="btn__container">
                      {/* only show hit, double, stand, if game state is true */}
                      <ActionBtn
                        name={'Hit'}
                        className={'btn btn__hit'}
                        handleClick={handleHit}
                        hideButtons={buttonsHidden}
                        currentPlayer={currentPlayer}
                      />
                      {/* show double only when player hand is 2 cards */}
                      {/* the double button is disabled after "hit" or "stand" is clicked */}
                      <ActionBtn
                        name={'2x'}
                        className={'btn btn__double'}
                        handleClick={handleDouble}
                        disabled={
                          playerHand.length > 2 ||
                          currentPlayer !== 'player1' ||
                          balance < currentBet
                        }
                        hideButtons={buttonsHidden}
                        currentPlayer={currentPlayer}
                      />
                      <ActionBtn
                        name={'Stand'}
                        className={'btn btn__stand'}
                        handleClick={() => handleStand(currentDeck)}
                        hideButtons={buttonsHidden}
                        currentPlayer={currentPlayer}
                      />
                      {/* show the deal again button after each hand is over */}
                      <DealAgainButton
                        dealAgain={dealAgain}
                        deckLoaded={currentDeck && currentDeck.length > 0}
                        hideButtons={buttonsHidden}
                      />
                    </div>
                  )}
                </div>
              </div>{' '}
              {/* wrapper div */}
            </div>{' '}
            {/* gameBoard div */}
          </>
        )
      }
      <DocErrorModal show={error} />
    </>
  );
}

export default App;
