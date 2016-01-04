var fs = require('fs');
var commander = require('commander');
var Converter = require('csvtojson').Converter;

//Command Line Arguments
commander.version('0.0.1')
		 .option('-i, --input <path>', 'CSV Input Path')
		 .option('-o, --output <path>', 'Json Output Path')
		 .parse(process.argv);

//Change this path csv data path
const inputPath = commander.input || 'data/in.csv';
const outputPath = commander.output || 'data/out.json';

//Construct Converter
csv = new Converter({
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
	writeToJSON(input);
})

function writeToJSON(input) {
	//Write Output
	var output = fs.createWriteStream(outputPath, {flags: 'w'});
	//Convert
	var csvOut = input.pipe(csv);
	csvOut.pipe(process.stdout);
	csvOut.pipe(output);
	console.log('Write Successfuly, Please check ' + '"' + outputPath + '"' + ' file');
}

