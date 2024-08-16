import mysql.connector
from flask import Flask, render_template, request, redirect

app = Flask(__name__)

def connect_db():
    return mysql.connector.connect(
        host = "localhost",
        user = "root",
        password = "Koko-kiyabi10",
        database = "usl"
        )
    
    
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/csSignUp' , methods = ['GET' , 'POST'])
def csSignUp():
    if request.method == 'POST':
        # Handle form submission
        first_name = request.form['first_name']
        email = request.form['email']
        last_name = request.form['last_name']
        degree = request.form['degree']
        team_id = request.form['team_id']
        
        # Connect to the database and insert the data
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("INSERT INTO player_info (first_name, email, last_name, degree, team_id) VALUES (%s, %s, %s, %s, %s)",
                       (first_name, email, last_name, degree, team_id))
        conn.commit()
        conn.close()

        return 'Signup Successful!'
    return render_template('csSignUp.html')



if __name__ == '__main__':
    app.run(debug=True)