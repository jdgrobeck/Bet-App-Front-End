// I need to 
const arrAvg = arr => arr.reduce((a,b) => a + b, 0) / arr.length

//mapping over the game the user selected
//what is scores?
// This is displaying all the average odds from each bookmaker
if (selectedGame) {
  const averageOdds = [selectedGame].map((game) => {
  const awayTeam = {
  	name: null, odds: null, scores: []
  }
  const homeTeam = {
  	name: '', odds: null, scores: []
  }
	if (game.bookmakers.length === 0) {
    return null;}
  
  // main data build
	game.bookmakers.map((bookie) => {
  		const outcomes = bookie.markets[0].outcomes; // outcomes information
    	const awayTeamData = outcomes[0];
      const homeTeamData = outcomes[1];
      if (!awayTeam.name){
      	awayTeam.name = awayTeamData.name
      }
      if (!homeTeam.name){
      	homeTeam.name = homeTeamData.name
      }
      awayTeam.scores.push(awayTeamData.price)
      homeTeam.scores.push(homeTeamData.price)
      return null;
  })
  
  // set averages
  awayTeam.odds = arrAvg(awayTeam.scores)
  homeTeam.odds = arrAvg(homeTeam.scores)

  return [awayTeam, homeTeam]
  })
  setOdds(averageOdds)
} // end of if statement