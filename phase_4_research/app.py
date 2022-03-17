from gc import get_debug
from flask import Flask, render_template, request, url_for, flash, redirect
import sqlite3
from werkzeug.exceptions import abort
import os.path
from noteAnalysis import noteAnalysis
base_dir = os.path.dirname(os.path.abspath(__file__))                   


def get_db_connection():
    conn = sqlite3.connect(os.path.join(base_dir, 'database.db'))
    conn.row_factory = sqlite3.Row
    return conn


def get_note(note_id):
    conn = get_db_connection()
    note = conn.execute('SELECT * FROM notes WHERE id = ?',
                        (note_id,)).fetchone()
    conn.close()
    if note is None:
        abort(404)
    return note


def getAnalysis():
    conn = get_db_connection()
    notes = conn.execute('SELECT * FROM notes').fetchall()
    for note in notes:
        id = note['id']
        noteAnalyzer = noteAnalysis(note['content'])
        scoreList = noteAnalyzer.getScoreList()
        conn.execute('UPDATE notes SET flesch_reading_ease = ?, flesch_kincaid_grade = ?,smog_index = ?, coleman_liau_index = ?, automated_readability_index = ?, dale_chall_readability_score = ?,difficult_words = ?,linsear_write_formula = ?,gunning_fog = ?,text_standard = ?,fernandez_huerta = ?,szigriszt_pazos = ?,gutierrez_polini = ?,crawford = ?,gulpease_index = ?,osman = ?'
                     ' WHERE id = ?',
                     (scoreList[0], scoreList[1], scoreList[2], scoreList[3], scoreList[4], scoreList[5], scoreList[6], scoreList[7], scoreList[8], scoreList[9], scoreList[10], scoreList[11], scoreList[12], scoreList[13], scoreList[14], scoreList[15], id))
        conn.commit()
    conn.close()


def getSuggestions(id, metric,intent_score):
    conn = get_db_connection()
    note = get_note(id)
    noteSug = noteAnalysis(note['content'])
    score, text = noteSug.bestScore(metric,intent_score)
    return score, text


app = Flask(__name__)
app.config['SECRET_KEY'] = '1234567890'


@app.route('/')
def index():
    conn = get_db_connection()
    notes = conn.execute('SELECT * FROM notes').fetchall()
    conn.close()
    return render_template('index.html', notes=notes)

# @app.route('/<int:post_id>')
# def post(post_id):
#     conn = get_db_connection()
#     posts = conn.execute('SELECT * FROM posts').fetchall()
#     conn.close()
#     post = get_post(post_id)
#     return render_template('post.html',post=post,posts=posts)


@app.route('/create', methods=('GET', 'POST'))
def create():
    conn = get_db_connection()
    notes = conn.execute('SELECT * FROM notes').fetchall()
    conn.close()
    if request.method == 'POST':
        title_ = request.form['title']
        content_ = request.form['content']
        class_ = request.form['class']
        if not title_:
            flash('Title is required!')
        elif not class_:
            flash("Class is required!")
        else:
            conn = get_db_connection()
            conn.execute('INSERT INTO notes (title, content,class) VALUES (?,?,?)',
                         (title_, content_, class_))
            notes = conn.execute('SELECT * FROM notes').fetchall()
            conn.commit()
            conn.close()
            return redirect(url_for('index'))

    return render_template('create.html', notes=notes)


@app.route('/<int:note_id>', methods=('GET', 'POST'))
def edit(note_id):
    conn = get_db_connection()
    notes = conn.execute('SELECT * FROM notes').fetchall()
    conn.close()
    note = get_note(note_id)
    if request.method == 'POST':
        title_ = request.form['title']
        content_ = request.form['content']
        class_ = request.form['class']

        if not title_:
            flash("Title is required!")
        elif not class_:
            flash("Class is required!")
        else:
            conn = get_db_connection()
            conn.execute('UPDATE notes SET title = ?, content = ?,class=?'
                         ' WHERE id = ?',
                         (title_, content_, class_, note_id))
            conn.commit()
            conn.close()
            return redirect(url_for("index"))
    return render_template('edit.html', note=note, notes=notes)


@app.route('/<int:id>/delete', methods=('POST',))
def delete(id):
    note = get_note(id)
    conn = get_db_connection()
    conn.execute('DELETE FROM notes WHERE id = ?', (id,))
    conn.commit()
    conn.close()
    flash('"{}" was successfully deleted!'.format(note['title']))
    return redirect(url_for('index'))


@app.route('/analytics', methods=('GET', 'POST'))
def analytics():
    metricList = ['flesch_reading_ease', 'flesch_kincaid_grade', 'smog_index', 'coleman_liau_index', 'automated_readability_index', 'dale_chall_readability_score',
                  'difficult_words', 'linsear_write_formula', 'gunning_fog', 'text_standard', 'fernandez_huerta', 'szigriszt_pazos', 'gutierrez_polini', 'crawford', 'gulpease_index', 'osman']
    getAnalysis()
    conn = get_db_connection()
    notes = conn.execute('SELECT * FROM notes').fetchall()
    conn.close()
    if request.method == 'POST':
        metric = request.form.get('metric')
        note_id = request.form["note_id"]
        note = get_note(note_id)
        
        if request.form['submit_button'] == 'Get Metric':
            score = note[metric]
            return render_template('analytics.html', notes=notes, metricList=metricList, score=score)
        if request.form['submit_button'] == 'Get Suggested':
            intent_score = request.form['intent_score']
            score, text = getSuggestions(note_id, metric,intent_score)
            return render_template('suggestions.html', note=note, metric=metric, score=score, text=text)

    return render_template('analytics.html', notes=notes, metricList=metricList)


@app.route('/<int:id>/suggestions', methods=('GET', 'POST'))
def suggestions(id):
    if request.method == 'POST':
        if request.form['submit_button'] == 'Keep This':
            text = request.form['text']
            conn = get_db_connection()
            conn.execute('UPDATE notes SET content = ?,'
                         ' WHERE id = ?',
                         (text,id))
            conn.commit()
            conn.close()
            return redirect(url_for('analytics'))

        else:
            return redirect(url_for('analytics'))

app.run(port=5000)
