const csv = require('csvtojson');

var numberOfIngestedRows = 0;
var contents = [];
const COLUMN_NAMES = ['player-id', 'year-id', 'stint', 'team-id', 'lg-id', 'pos', 'g', 'gs', 'innouts', 'po', 'a', 'e', 'dp', 'pb', 'wp', 'sb', 'cs', 'pickoffs', 'zr', 'missing-g-c', 'missing-g'];

function ingest(fileToIngest, columnNames, callback) {
	console.log("Ingesting " + fileToIngest + "...");

	console.time('ingest');

	csv({noheader:true, headers: columnNames})
		.fromFile(fileToIngest)
		.on('json',(json) => {
	  	numberOfIngestedRows = numberOfIngestedRows + 1
	  	contents.push(json);
		})
		.on('done', (error) => {
			console.timeEnd('ingest');
			callback(contents);
		});
	return contents;
}

exports.ingestFieldingStats = function(callback) {
	return ingest('./csv/Fielding.csv', COLUMN_NAMES, callback);
}
