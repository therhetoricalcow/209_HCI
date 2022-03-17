import textstat
from nltk.corpus import wordnet
import re


class noteAnalysis:
    def __init__(self, text_data):
        self.text_data = text_data
        self.flesch_reading_ease = textstat.flesch_reading_ease(self.text_data)
        self.flesch_kincaid_grade = textstat.flesch_kincaid_grade(
            self.text_data)
        self.smog_index = textstat.smog_index(self.text_data)
        self.coleman_liau_index = textstat.coleman_liau_index(self.text_data)
        self.automated_readability_index = textstat.automated_readability_index(
            self.text_data)
        self.dale_chall_readability_score = textstat.dale_chall_readability_score(
            self.text_data)
        self.difficult_words = textstat.difficult_words(self.text_data)
        self.linsear_write_formula = textstat.linsear_write_formula(
            self.text_data)
        self.gunning_fog = textstat.gunning_fog(self.text_data)
        self.text_standard = textstat.text_standard(self.text_data)
        self.fernandez_huerta = textstat.fernandez_huerta(self.text_data)
        self.szigriszt_pazos = textstat.szigriszt_pazos(self.text_data)
        self.gutierrez_polini = textstat.gutierrez_polini(self.text_data)
        self.crawford = textstat.crawford(self.text_data)
        self.gulpease_index = textstat.gulpease_index(self.text_data)
        self.osman = textstat.osman(self.text_data)
        self.scores = [self.flesch_reading_ease,self.flesch_kincaid_grade,self.smog_index,self.coleman_liau_index,self.automated_readability_index,self.dale_chall_readability_score,
        self.difficult_words,self.linsear_write_formula,self.gunning_fog,self.text_standard,self.fernandez_huerta,self.szigriszt_pazos,self.gutierrez_polini,self.crawford,self.gulpease_index,self.osman]

    def getScoreList(self):
        return self.scores
    def synonym_extractor(self, phrase):
        synonyms = []

        for syn in wordnet.synsets(phrase):
            for l in syn.lemmas():
                synonyms.append(l.name())
        return synonyms

    def getScore(self, analysis, text):
        if analysis == "flesch_reading_ease":
            score = textstat.flesch_reading_ease(text)
        elif analysis == "flesch_kincaid_grade":
            score = textstat.flesch_kincaid_grade(text)
        elif analysis == "smog_index":
            score = textstat.smog_index(text)
        elif analysis == "coleman_liau_index":
            score = textstat.coleman_liau_index(text)
        elif analysis == "automated_readability_index":
            score = textstat.automated_readability_index(text)
        elif analysis == "dale_chall_readability_score":
            score = textstat.dale_chall_readability_score(text)
        elif analysis == "difficult_words":
            score = textstat.difficult_words(text)
        elif analysis == "linsear_write_formula":
            score = textstat.linsear_write_formula(text)
        elif analysis == "gunning_fog":
            score = textstat.gunning_fog(text)
        elif analysis == "text_standard":
            score = textstat.text_standard(text)
        elif analysis == "fernandez_huerta":
            score = textstat.fernandez_huerta(text)
        elif analysis == "szigriszt_pazos":
            score = textstat.szigriszt_pazos(text)
        elif analysis == "gutierrez_polini":
            score = textstat.gutierrez_polini(text)
        elif analysis == "crawford":
            score = textstat.crawford(text)
        elif analysis == "gulpease_index":
            score = textstat.gulpease_index(text)
        else:
            score = textstat.osman(text)
        return score

    def bestScore(self, analysis,intended_score):
        highWordList = re.findall(r'\w+', self.text_data)
        highText = " ".join(highWordList)
        highScore = self.getScore(analysis,highText)
        for i in range(len(highWordList)):
            synList = self.synonym_extractor(highWordList[i])
            for syn in synList:
                newWordList = highWordList
                newWordList[i] = syn
                text = " ".join(newWordList)
                newScore = self.getScore(analysis,text)
                if abs(newScore-int(intended_score)) < abs(highScore-int(intended_score)):
                    highScore = newScore
                    highWordList = newWordList
                    highText = text
        return highScore,highText

    

