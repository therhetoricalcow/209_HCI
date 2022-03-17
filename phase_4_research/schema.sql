DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    class TEXT NOT NULL,
    flesch_reading_ease TEXT,
    flesch_kincaid_grade TEXT,
    smog_index TEXT,
    coleman_liau_index TEXT,
    automated_readability_index TEXT,
    dale_chall_readability_score TEXT,
    difficult_words TEXT,
    linsear_write_formula TEXT,
    gunning_fog TEXT,
    text_standard TEXT,
    fernandez_huerta TEXT,
    szigriszt_pazos TEXT,
    gutierrez_polini TEXT,
    crawford TEXT,
    gulpease_index TEXT,
    osman TEXT
);