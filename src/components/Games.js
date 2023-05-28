// const basketballOdds = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds?apiKey=58d801718116db2c8282a6568a9ebcaa&regions=us&oddsFormat=american'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO, isAfter, startOfToday } from 'date-fns';
import "../App.css";

// const authToken = localStorage.getItem("authToken");

// const config = {
//   headers: { Authorization: `Bearer ${authToken}` },
// };

// axios.get("/dashboard", config)
//   .then((response) => {
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

  


const Games = () => {


console.log(localStorage)
const [nba, setNba] = useState([]);
//This is where we store a selected game
const [selectedGame, setSelectedGame] = useState(null);
const [awaySpread, setAwaySpread] = useState(null); // Added state for spread
const [homeSpread, setHomeSpread] = useState(null); // Added state for spread
const [awayOdds, setAwayOdds] = useState(null); 
const [homeOdds, setHomeOdds] = useState(null); 
const [bets, setBets] = useState([])
// const [odds, setOdds] = useState([]);

const userId = localStorage.getItem("user id")

let awayTeamBetData = null;
let homeTeamBetData = null;


  useEffect(() => {
   axios.get('https://capstone-planning.vercel.app/games')
   .then(response => setNba(response.data))


  }, []); // empty array ensures that the effect runs only once, when the component is mounted.

  useEffect(() => {
   axios.get(`https://capstone-planning.vercel.app/bets/${userId}`)
   .then(response => setBets(response.data))


  }, [userId]); // empty array ensures that the effect runs only once, when the component is mounted.

  console.log(bets)


  const handleSelectedGame = (event) => {
    const gameId = event.target.value;
    const selectedGame = nba.find(game => game.id === gameId);
    setSelectedGame(selectedGame);
    console.log(selectedGame)
    console.log(selectedGame.away_team)
    console.log(selectedGame.home_team)
    //How do I map over the selectedGame?
    //I think I can map here to get every spread. For now, just returning spread for away team.
    // This works for the away team. Now, how do I get the spread for the home team?
    // Error checking for falsy statements
    // I think this is what Taz's repo is doing in his repo
    //Why am I getting undefined without choosing a game?
  
    if (selectedGame) {
      const awaySpread = selectedGame?.bookmakers?.[0]?.markets?.[1]?.outcomes?.[0]?.point ?? null;
      setAwaySpread(awaySpread);
    
      const homeSpread = selectedGame?.bookmakers?.[0]?.markets?.[1]?.outcomes?.[1]?.point ?? null;
      setHomeSpread(homeSpread);
    
      const awayOdds = selectedGame?.bookmakers?.[0]?.markets?.[0]?.outcomes?.[1]?.price ?? null;
      const formattedAwayOdds = awayOdds > 0 ? `+${awayOdds}` : awayOdds; // Add "+" sign if positive
      setAwayOdds(formattedAwayOdds);
    
      const homeOdds = selectedGame?.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.price ?? null;
      const formattedHomeOdds = homeOdds > 0 ? `+${homeOdds}` : homeOdds; // Add "+" sign if positive
      setHomeOdds(formattedHomeOdds);
    } else {
      setAwaySpread(null);
      setHomeSpread(null);
      setAwayOdds(null);
      setHomeOdds(null);
    }

//    if (selectedGame) {
//   const awayOdds = selectedGame?.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.price ?? null;
//   setAwayOdds(awayOdds);

//   const homeOdds = selectedGame?.bookmakers?.[0]?.markets?.[0]?.outcomes?.[1]?.price ?? null;
//   setHomeOdds(homeOdds);
// } else {
//   setAwayOdds(null);
//   setHomeOdds(null);
// }




    // homeTeamBetData = selectedGame ? {
    //   user_id: localStorage,
    //   game_id: selectedGame.id,
    //   commence_time: selectedGame.commence_time,
    //   // IT's sport_title in the API but sport in my db. Which one do I use?
    //   sport: selectedGame.sport_title,
    //   pick: selectedGame.home_team,
    //   spread: homeSpread // assuming homeSpread is already set by the previous logic
    // } : null;
  
    // awayTeamBetData = selectedGame ? {
    //   user_id: localStorage,
    //   game_id: selectedGame.id,
    //   commence_time: selectedGame.commence_time,
    //   sport: selectedGame.sport_title,
    //   pick: selectedGame.away_team,
    //   spread: awaySpread // assuming awaySpread is already set by the previous logic
    // } : null;
    
    


} // end of handleSelectedGame

// if home team is picked, send this betsData with pick: selectedGame.home_team. Else send pick: selectedGame.away_team. How do I differentiate the buttons?
// I believe I could also define homeTeamBetData and awayTeamBetData outside of handleSelectedGame and pass them as parameters to handleWinnerPick



const handleWinnerPick = (event) => {
  const betsUrl = "https://capstone-planning.vercel.app/bets"
  
  
  homeTeamBetData = selectedGame ? {
    user_id: userId,
    game_id: selectedGame.id,
    commence_time: selectedGame.commence_time,
    // It's not capturing anything here no matter what I put
    home_team: selectedGame.home_team,
    away_team: selectedGame.away_team,
    // IT's sport_title in the API but sport in my db. Which one do I use?
    sport: selectedGame.sport_title,
    pick: selectedGame.home_team,
    odds: homeOdds,
    spread: homeSpread,
    result: "" // assuming homeSpread is already set by the previous logic
  } : null;

  console.log(homeTeamBetData)

  awayTeamBetData = selectedGame ? {
    user_id: userId,
    game_id: selectedGame.id,
    commence_time: selectedGame.commence_time,
    //Why isn't it capturing this?
    home_team: selectedGame.home_team,
    away_team: selectedGame.away_team,
    sport: selectedGame.sport_title,
    pick: selectedGame.away_team,
    odds: awayOdds,
    spread: awaySpread,
    result: "" // assuming awaySpread is already set by the previous logic
  } : null;
  // This prevents page from loading automatically
  event.preventDefault()

  let buttonValue = event.target.value;
  console.log(event.target.value)

  if (buttonValue === "away-team-pick"){
    axios.post(betsUrl, awayTeamBetData)

    .then(response => {
      console.log('Data sent successfully:', response.data);
      // Handle success, such as showing a success message, updating state, etc.
    })
    .catch(error => {
      console.error('Error sending data:', error);
      // Handle error, such as showing an error message, etc.
    });

  } else if (buttonValue === "home-team-pick") {
    axios.post(betsUrl, homeTeamBetData)
    .then(response => {
      console.log('Data sent successfully:', response.data);
      // Handle success, such as showing a success message, updating state, etc.
    })
    .catch(error => {
      console.error('Error sending data:', error);
      // Handle error, such as showing an error message, etc.
    });
  }
window.alert("Bet submitted. Good luck!")
window.location.reload()
}

const deleteBet = (event) => {
  const betId = event.target.dataset.betId; // Get the ID of the bet from the button's dataset

  const betsUrl = `https://capstone-planning.vercel.app/bets/${betId}`; // Append the bet ID to the URL

  axios
    .delete(betsUrl)
    .then(response => {
      console.log('Bet deleted successfully:', response.data);
      // Handle success, such as showing a success message, updating state, etc.
    })
    .catch(error => {
      console.error('Error deleting bet:', error);
      // Handle error, such as showing an error message, etc.
      window.alert("An error occurred while deleting the bet.");
    });

  // Reload the page to reflect the updated bet list
  window.alert("Bet deleted.");
  window.location.reload();
}

// filtering out based on the current date
// Might leave this out to have more options.
// const todaysGames = nba.filter(game => isToday(parseISO(game.commence_time)));

const currentDate = startOfToday();

return (
  <div className="games-container">
   <div className={`${bets.some(bet => isAfter(parseISO(bet.commence_time), currentDate)) ? 'games-wrapper' : 'no-bets-games-wrapper'}`}>
      <div className="games">
        <h1>Games</h1>
        <select onChange={handleSelectedGame}>
          <option value="">Pick a Game</option>
          {nba.map((game, index) => {
            const tipOff = parseISO(game.commence_time);
            const date = format(tipOff, 'MM/dd/yyyy');
            const time = format(tipOff, 'hh:mm a');
            const onTonight = `${game.away_team} @ ${game.home_team} ${date} ${time}`;
            return (
              <option key={index} value={game.id}>
                {onTonight}
              </option>
            );
          })}
        </select>
        {/* Why am I getting undefined @ undefined when the page initially loads? 
          had to change initial state of selected game to null*/}
        {selectedGame && (
          <div>
            <h3>{`${selectedGame.away_team} @ ${selectedGame.home_team}`}</h3>
            {/* <p>Spread for {selectedGame.away_team}: {awaySpread}</p> */}
            <p>{selectedGame.away_team} odds: {awayOdds}</p>
            {/* <p>Spread for {selectedGame.home_team}: {homeSpread}</p> */}
            <p>{selectedGame.home_team} odds: {homeOdds}</p>
            <button value="away-team-pick" onClick={handleWinnerPick} className="selected-game-button">Pick {selectedGame.away_team}</button>
            <button value="home-team-pick" onClick={handleWinnerPick} className="selected-game-button">Pick {selectedGame.home_team}</button>
            {/* <p>Spread for {selectedGame.home_team}: {spread[1][2]}</p> */}
          </div>
        )}
      </div>
    </div>
    

    {/* This works, but the data in the fetched data is wrong */}
  {bets && bets.some(bet => isAfter(parseISO(bet.commence_time), currentDate)) ? (
  <div className="bets-container">
    <div className="bets">
      <h2>My Bets</h2>
      {bets
        .filter(bet => isAfter(parseISO(bet.commence_time), currentDate)) // Filter bets based on commence_time
        .map((bet, index) => {
          const commenceTime = new Date(bet.commence_time);
          const timeOptions = { hour: 'numeric', minute: 'numeric' };
          const formattedTime = commenceTime.toLocaleTimeString([], timeOptions);
          return (
            <div key={index}>
              <h3>{bet.away_team} @ {bet.home_team}</h3>
              <p>Date: {commenceTime.toLocaleDateString()}, {formattedTime}</p>
              <p>Pick: {bet.pick}</p>
              {/* <p>Spread: {bet.spread}</p> */}
              <p>Odds: {bet.odds > 0 ? `+${bet.odds}` : bet.odds}</p>
              <div className="delete-bet-button">
                <button onClick={deleteBet} data-bet-id={bet.id}>Delete Bet</button>
              </div>
            </div>
          );
        })}
    </div>
  </div>
) : null }
  </div>
);
}
export default Games;


