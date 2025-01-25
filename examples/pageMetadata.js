var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('../src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');


var docDefinition = {
	content: [
		{
			text: 'This is a page metadata example.\n\nDefining a property "pageMetadata" in a node will add metadata to the page where the node is rendered. If a page does not have a node with a pageMetadata defined, it will inherit the previously set metadata. The metadata can be used in background, header and footer callbacks.'
		},		
		{
			text: 'First page content: it has no metadata.',
      pageBreak: 'after'
		},
    {
			text: 'second page content. Metadata will be set in a later node.',      
		},		
		{
			text: 'Setting metadata',
      pageMetadata: { hello: 'world' }
		},
    {
			text: 'Some more page content',
      pageBreak: 'after'
		},		
    {
			text: 'Third page content. Metadata will be inherited from previous page. Useful with automatic page breaks.',      
		},				
    {
			text: 'Some more page content',      
		},		
	],
	styles: {
		header: {
			fontSize: 18,
			bold: true
		},
		subheader: {
			fontSize: 15,
			bold: true
		},
		quote: {
			italics: true
		},
		small: {
			fontSize: 8
		},
    
	},
  header(current, total, info) {
    return [{ text: 'Metadata page ' + current + '  ' + JSON.stringify(info.metadata) }];
  }
};

var now = new Date();
var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('pdfs/pageMetadata.pdf'));
pdfDoc.end();

console.log(new Date() - now);
