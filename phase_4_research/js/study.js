const fs = require('fs')
const pdfparse = require('pdf-parse')
var stm = require('stm');


//[part of library imports
var wf = {
	/* Simply points to stm library */
	tokenise: stm.tokenise,
	/* Simply points to stm library */
	stem: stm.stem,
	/**
	  * Returns the term frequencies of a document as an Object–e.g. `"I like node" -> { I: 1, like: 1, node: 1}`
	  *
	  * text - String. The text in which frequency is to be calculated.
	  * shouldStem (true) - Boolean. Turns stemming on and off. http://en.wikipedia.org/wiki/Stemming
		*/
	freq: function (text, noStopWords, shouldStem) {
		var freq = {};
		try {
			noStopWords = (typeof noStopWords === 'undefined') ? true : noStopWords;  // set default to `true`
			text = (typeof shouldStem === 'undefined' || shouldStem) ? this.stem(text, noStopWords) : this.tokenise(text, noStopWords);	
		} catch (e) {
			return new Error('Please ensure that the text is a valid string.');
		} finally {
			text.forEach(function (word) {
				if (freq.hasOwnProperty(word)) freq[word] += 1;
				else freq[word] = 1;
			});
			return freq;
		}
	}
}
module.exports = wf;
//end library imports




//Start Module, put pdf in same locatio to run and change name 'example pdf'
const pdffile = fs.readFileSync('example.pdf')
find_top_words()
function find_top_words(){
    //get the information
    pdfparse(pdffile).then(function (data) {
        const wordstr = data.text
        var frequency = wf.freq(wordstr)
        var i = 0
        var word_count = 0
        const keywords = {}
        for (var key of Object.keys(frequency)){
            //if the word appears more than 3 times, doesnt have numbers in it, and is longer 4 letters
            if ((frequency[key] > 3) && !(/^-?[\d.]+(?:e-?\d+)?$/.test(key)) && (key.length > 4)) {
                //console.log(key + " -> " + frequency[key])
                keywords[key] = frequency[key]
                word_count++
            }
            i++
        }
        //Limit to the top ten words only
        var num_words_to_study = 10
        var num_added = 0
        var top_words= {}
        var min_freq = 0
        for (var key of Object.keys(keywords)){
            //if first ten in list, add to list
            if (num_added <num_words_to_study){
                top_words[key] = keywords[key]
                num_added ++
                if ((min_freq == 0) || (min_freq > keywords[key])){
                    min_freq = keywords[key]
                }
                //if you now have the correct number of words, filter by frequency
                if (!(num_added <num_words_to_study)){
                    //sorty by frequency
                    top_words = Object.fromEntries(Object.entries(top_words).sort(([,a],[,b]) => a-b))
                }
            }
            //if word frequency is more than the minimum in the list, delete minimum and add new
            else if (min_freq < keywords[key]){
                var index = 0
                var low_freq_key = 'hi' 
                //get the first key
                for (var top_key of Object.keys(top_words)){
                    if(index == 0){
                        low_freq_key = top_key
                        break 
                    }
                }
                delete top_words[low_freq_key]
  
                top_words[key] = keywords[key]
                top_words = Object.fromEntries(Object.entries(top_words).sort(([,a],[,b]) => a-b))
                //get the first key
                for (var top_key of Object.keys(top_words)){
                    if(index == 0){
                        low_freq_key = top_key
                        break 
                    }
                }
                min_freq = top_words[low_freq_key] 

            }
            
        }
        console.log(top_words)
    })
}