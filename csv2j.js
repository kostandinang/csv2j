var fs = require('fs');
var commander = require('commander');
var csvToJson = require('csvtojson');

//Command Line Arguments
commander.version('0.0.1')
		 .option('-i, --input <path>', 'CSV Input Path')
		 .option('-o, --output <path>', 'Json Output Path')
		 .parse(process.argv);

//Change this path csv data path
const inputPath = commander.input || 'data/in.csv';
const outputPath = commander.output || 'data/out.json';

//Construct Converter
converter = new csvToJson.Converter({
	constructResult: false,
	toArrayString: true
});

//Read Input
var input = fs.createReadStream(inputPath);

input.on('error', function() {
	console.error("No input file found");
});

//Successful file read
input.on('open', function() {
	writeToJSON(input, outputPath, converter);
})

/**
* Write converted json input to outputPath
*/
function writeToJSON(input, outputPath, converter) {
	//Write Output
	var output = fs.createWriteStream(outputPath, {flags: 'w'});
	//Convert
	var csvOut = input.pipe(converter);
	csvOut.pipe(process.stdout);
	csvOut.pipe(output);
	console.log('Write Successfuly, Please check ' + '"' + outputPath + '"' + ' file');
}

