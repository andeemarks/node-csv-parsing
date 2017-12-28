const http = require('http');
const ingestor = require('./ingest');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({"numberOfIngestedRows": stats.length}));
});

server.listen(PORT, HOSTNAME, () => {
	stats = ingestor.ingestFieldingStats();
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});