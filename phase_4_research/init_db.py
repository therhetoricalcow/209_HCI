import sqlite3


connection = sqlite3.connect('database.db')

with open('schema.sql') as f:
    connection.executescript(f.read())

cur = connection.cursor()

cur.execute("INSERT INTO notes (title, content, class) VALUES (?,?,?)",
('Intro', 'Heat is chaos.','Thermodynamics'))

cur.execute("INSERT INTO notes (title, content, class) VALUES (?,?,?)",
            ('Intro', 'Particles go bye bye','Quantum Mechanics')
            )


connection.commit()
connection.close()