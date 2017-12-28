const http = require('http');
const csv = require('csvtojson');

const HOSTNAME = '127.0.0.1';
const PORT = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('Hello World\n');
});

const CSVFILEPATH = './csv/Fielding.csv'

function ingest(fileToIngest) {
	console.log("Ingesting " + fileToIngest);
	
	var numberOfIngestedRows = 0;

	const COLUMN_NAMES = ['player-id', 'year-id', 'stint', 'team-id', 'lg-id', 'pos', 'g', 'gs', 'innouts', 'po', 'a', 'e', 'dp', 'pb', 'wp', 'sb', 'cs', 'pickoffs', 'zr', 'missing-g-c', 'missing-g'];

	console.time('ingest');

	csv({noheader:true, headers: COLUMN_NAMES})
		.fromFile(CSVFILEPATH)
		.on('json',(json) => {
	  	numberOfIngestedRows = numberOfIngestedRows + 1
	    // console.log(json)
		})
		.on('done', (error) => {
		  console.log(numberOfIngestedRows)

			console.timeEnd('ingest');
		});
}

server.listen(PORT, HOSTNAME, () => {
	ingest(CSVFILEPATH);
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});