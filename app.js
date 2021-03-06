const http = require('http');
const ingestor = require('./ingest');
const groupArray = require('group-array');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({'numberOfPlayers': Object.keys(statsByPlayerId).length, 'numberOfIngestedRows': rawStats.length}));
});

var rawStats;
var statsByPlayerId;

function splitStatsByPlayerId(rawStats) {
  statsByPlayerId = JSON.parse(JSON.stringify(groupArray(rawStats, 'player-id')));
}

server.listen(PORT, HOSTNAME, () => {
	rawStats = ingestor.ingestFieldingStats(splitStatsByPlayerId);
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});