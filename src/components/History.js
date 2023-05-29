import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { parseISO, isBefore } from 'date-fns';
import "../App.css";

const History = () => {
  const [bets, setBets] = useState([]);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const userId = localStorage.getItem("user id");

  useEffect(() => {
    axios.get(`https://capstone-planning.vercel.app/bets/${userId}`)
      .then(response => setBets(response.data));
  }, [userId]);

  // useEffect(() => {
  //   axios.get(`https://capstone-planning.vercel.app/bets/${userId}`)
  //     .then(response => {
  //       const fetchedBets = response.data;
  //       axios.get('https://capstone-planning.vercel.app/scores')
  //         .then(scoresResponse => {
  //           const scoresData = scoresResponse.data;
  //           const updatedBets = fetchedBets.map(bet => {
  //             const game = scoresData.find(score => score.id === bet.game_id)
    
  //             if (game && game.scores) {
  //               const homeScore = parseInt(game.scores[0].score);
  //               const awayScore = parseInt(game.scores[1].score);
    
  //               if (
  //                 (bet.pick === bet.home_team && homeScore > awayScore) ||
  //                 (bet.pick === bet.away_team && awayScore > homeScore)
  //               ) {
  //                 bet.result = 'W';
  //               } else {
  //                 bet.result = 'L';
  //               }
  //             } else {
  //               bet.result = 'N/A';
  //             }
    
  //             return bet;
  //           });
    
  //           setBets(updatedBets);
  //         });
  //     });
  // }, [userId]);

  useEffect(() => {
    axios.get(`https://capstone-planning.vercel.app/bets/${userId}`)
      .then(response => {
        const fetchedBets = response.data;
        axios.get('https://capstone-planning.vercel.app/scores')
          .then(scoresResponse => {
            const scoresData = scoresResponse.data;
            const updatedBets = fetchedBets.map(bet => {
              const game = scoresData.find(score => score.id === bet.game_id);
              
              let result = 'N/A';
  
              if (game && game.scores) {
                const homeScore = parseInt(game.scores[0].score);
                const awayScore = parseInt(game.scores[1].score);
  
                if (
                  (bet.pick === bet.home_team && homeScore > awayScore) ||
                  (bet.pick === bet.away_team && awayScore > homeScore)
                ) {
                  result = 'W';
                } else {
                  result = 'L';
                }
              }
  
              return { ...bet, result };
            });
  
            const updateBetsPromises = updatedBets.map(updatedBet =>
              axios.put(`https://capstone-planning.vercel.app/bets/${updatedBet.id}`, updatedBet)
            );
  
            Promise.all(updateBetsPromises)
              .then(() => {
                setBets(updatedBets);
              })
              .catch(error => {
                console.log('Error updating bets:', error);
              });
          });
      });
  }, [userId]);


  useEffect(() => {
    if (bets) {
      let winsCount = 0;
      let lossesCount = 0;
  
      bets.forEach((bet) => {
        if (bet.result === 'W') {
          winsCount++;
        } else if (bet.result === 'L') {
          lossesCount++;
        }
      });
  
      setWins(winsCount);
      setLosses(lossesCount);
    }
  }, [bets]);

  const currentDate = new Date(); // Get the current date

  if (!bets.some(bet => isBefore(parseISO(bet.commence_time), currentDate))) {
    return (
      <div className="history-wrapper">
        <div className="history">
          <h2>No History</h2>
        </div>
      </div>
    )
  }
  
  // let wins = 0;
  // let losses = 0;

  return (
    <>
      {bets && bets.some(bet => isBefore(parseISO(bet.commence_time), currentDate)) ? (
        <div className="history-wrapper">
          <div className="history">
            <h2>History</h2>
            <h3>Record: {wins} - {losses}</h3>
            <div className="history-rows">
              {bets
               .filter(bet => isBefore(parseISO(bet.commence_time), currentDate))
               .sort((a, b) => new Date(b.commence_time) - new Date(a.commence_time)) // Sort bets by most recent commenceTime
               .map((bet, index) => {
                 const commenceTime = new Date(bet.commence_time);
                 const timeOptions = { hour: 'numeric', minute: 'numeric' };
                 const formattedTime = commenceTime.toLocaleTimeString([], timeOptions);
  
                  // if (bet.result === 'W') {
                  //   wins++;
                  // } else if (bet.result === 'N/A') {
                    
                  // } else {
                  //   // Handle the case when result is neither 'W' nor 'N/A'
                  //   losses++;
                  // }
  
                  return (
                    <div className="bet-item" key={index}>
                      <h3>{bet.away_team} @ {bet.home_team}</h3>
                      <p>Date: {commenceTime.toLocaleDateString()}, {formattedTime}</p>
                      <p>Pick: {bet.pick}</p>
                      <p>Odds: {bet.odds > 0 ? `+${bet.odds}` : bet.odds}</p>
                      <p>Result: <span> {bet.result === 'W' ? <span style={{ color: 'green', fontWeight: "bold" }}>W</span> : <span style={{ color: 'red', fontWeight: "bold"  }}>{bet.result}</span>}</span></p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      ) : null }
    </>
  );
}

export default History;