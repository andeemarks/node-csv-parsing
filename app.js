const http = require('http');

const csv=require('csvtojson')

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  	res.statusCode = 200;
  	res.setHeader('Content-Type', 'text/plain');
  	res.end('Hello World\n');
});

var numberOfIngestedRows = 0;

const csvFilePath='./csv/Fielding.csv'
console.time("ingest");
csv({noheader:true, headers: ['player-id', 'year-id', 'stint', 'team-id', 'lg-id', 'pos', 'g', 'gs', 'innouts', 'po', 'a', 'e', 'dp', 'pb', 'wp', 'sb', 'cs', 'pickoffs', 'zr', 'missing-g-c', 'missing-g']}).fromFile(csvFilePath).on('json',(json)=>{
    numberOfIngestedRows = numberOfIngestedRows + 1
    // console.log(json)
}).on('done',(error)=>{
    console.log(numberOfIngestedRows)
	console.timeEnd("ingest");
})

server.listen(port, hostname, () => {
  	console.log(`Server running at http://${hostname}:${port}/`);
});