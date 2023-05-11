

// const basketballOdds = 'https://api.the-odds-api.com/v4/sports/basketball_nba/odds?apiKey=58d801718116db2c8282a6568a9ebcaa&regions=us&oddsFormat=american'

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, parseISO, isToday } from 'date-fns';

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
// const [odds, setOdds] = useState([]);

  useEffect(() => {
   axios.get('https://capstone-planning.vercel.app/games')
   .then(response => setNba(response.data))


  }, []); // empty array ensures that the effect runs only once, when the component is mounted.

  

  let awayTeamBetData = null;
  let homeTeamBetData = null;
    

  const handleSelectedGame = (event) => {
    const gameId = event.target.value;
    const selectedGame = nba.find(game => game.id === gameId);
    setSelectedGame(selectedGame);
    //How do I map over the selectedGame?
    //I think I can map here to get every spread. For now, just returning spread for away team.
    // This works for the away team. Now, how do I get the spread for the home team?
    // Error checking for falsy statements
    // I think this is what Taz's repo is doing in his repo
    //Why am I getting undefined without choosing a game?
  
    if (selectedGame) {
      const awaySpread = selectedGame?.bookmakers?.[0]?.markets?.[0]?.outcomes?.[0]?.point ?? null;
    setAwaySpread(awaySpread);

    const homeSpread = selectedGame?.bookmakers?.[0]?.markets?.[0]?.outcomes?.[1]?.point ?? null;
    setHomeSpread(homeSpread);
    } else {
      setAwaySpread(null);
      setHomeSpread(null);
    }

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
    user_id: localStorage.getItem("user id"),
    game_id: selectedGame.id,
    commence_time: selectedGame.commence_time,
    // IT's sport_title in the API but sport in my db. Which one do I use?
    sport: selectedGame.sport,
    pick: selectedGame.home_team,
    spread: homeSpread // assuming homeSpread is already set by the previous logic
  } : null;

  awayTeamBetData = selectedGame ? {
    user_id: localStorage.getItem("user id"),
    game_id: selectedGame.id,
    commence_time: selectedGame.commence_time,
    sport: selectedGame.sport,
    pick: selectedGame.away_team,
    spread: awaySpread // assuming awaySpread is already set by the previous logic
  } : null;
  // This prevents page from loading automatically
  event.preventDefault()

  let buttonValue = event.target.value;

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
}

// filtering out based on the current date
const todaysGames = nba.filter(game => isToday(parseISO(game.commence_time)));
  

  return (
    <div>
      <h1>Daily NBA Bets</h1>
      <select onChange={handleSelectedGame}>
        <option value = "">Pick a Game</option>
        {todaysGames.map((game, index) => {
           const tipOff = parseISO(game.commence_time);
           const date = format(tipOff, 'MM/dd/yyyy');
           const time = format(tipOff, 'hh:mm a');
           const onTonight = `${game.away_team} @ ${game.home_team} ${date} ${time}`;
             return (
               <option key={index} value={game.id}>
                 {onTonight}
               </option>
          )
        })}
      </select>
      {/* Why am I getting undefined @ undefined when the page initially loads? 
      had to change initial state of selected game to null*/}
      {selectedGame && (
        <div>
          <h2>{`${selectedGame.away_team} @ ${selectedGame.home_team}`}</h2>
          <p>Spread for {selectedGame.away_team}: {awaySpread}</p>
          <p>Spread for {selectedGame.home_team}: {homeSpread}</p>
          <button value="away-team-pick" onClick={handleWinnerPick}>Pick {selectedGame.away_team}</button>
          <button value="home-team-pick" onClick={handleWinnerPick}>Pick {selectedGame.home_team}</button>
          {/* <p>Spread for {selectedGame.home_team}: {spread[1][2]}</p> */}
        </div>
      )}
    </div>
  )

};
export default Games;