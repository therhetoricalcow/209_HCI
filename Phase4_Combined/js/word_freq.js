const fs = require('fs') //file system module
const pdfparse = require('pdf-parse')

const pdffile = fs.readFileSync('./pdfs/example.pdf')
var freqMap = {}

const varparse = 'h'
//count frequencies of words in pdf
function wordFreq(text) {
    var words = text.replace(/[.]/g, '').split(/\s/);
    freqMap = {};
    words.forEach(function(w) {
        if (!freqMap[w]) {
            freqMap[w] = 0;
        }
        freqMap[w] += 1;
    });

    return freqMap;
}





let word_freq = pdfparse(pdffile).then(function (data){
    //console.log(data.numpages)
    pdf_text = data.text
    
    return wordFreq(pdf_text)
})





console.log(word_freq)