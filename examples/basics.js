var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('../src/printer');
var loggify = require('./pdfdoc-loggify')
var printer = new PdfPrinter(fonts);
var fs = require('fs');
var PdfKit = require('pdfkit');

var docDefinition = {
	content: [
		'First paragraph',
		'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
	]
};

loggify(PdfKit.prototype);
var pdfDoc = printer.createPdfKitDocument(docDefinition);

pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
pdfDoc.end();

pdfDoc.saveCommands('basics')
