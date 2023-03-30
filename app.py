from flask import Flask
from flask import Flask, flash, redirect, render_template, request, session
from flask_session import Session
import requests
from flask import g
from datetime import datetime
from extras import message, login_required
from werkzeug.security import check_password_hash, generate_password_hash
#from config import cluster
#from pymongo import MongoClient


# References for using sqlite3 with python and flask
# 1) https://pythonbasics.org/flask-sqlite/
# 2) https://flask.palletsprojects.com/en/2.2.x/patterns/sqlite3/

#MongoDB
#client = MongoClient(cluster)
#db = client.test
#todos = db.todos
#print ("Items:", todos.count_documents({}))  # Counts every element in the database
#print ("Specific search count:", todos.count_documents({"age": "37"}))  # Counts by searching



fieldsList = ["Software Development","Robotics and Machine Design","Product and Project Management"]


app = Flask(__name__)
# Configure session to use filesystem (instead of signed cookies)
# This part was used the same as CS50's Finance exercise
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


"""
@app.after_request
def after_request(response):
    #Ensure responses aren't cached
    # This part was used the same as CS50's Finance exercise
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0
    response.headers["Pragma"] = "no-cache"
    return response
"""


# Homepage route
@app.route("/")
#@login_required
def index():
    #user_id = session["user_id"]

    
    today = str(datetime.today())
    #today = today.strftime("%Y-%m-%d")

    client_ip = request.remote_addr

    f = open("visitors.txt", "a")
    f.write("DATE: " + today + " | IP: " + client_ip + "\n")
    f.close()
       
    return render_template("index.html", fieldsList=fieldsList)


# Bookmovie project page
@app.route("/bookmovie")
def bookmovie():
    return render_template("bookmovie.html")


# CNC projects page
@app.route("/cnc")
def cnc():
    return render_template("cnc.html")


# Tupia projects page
@app.route("/tupia")
def tupia():
    return render_template("tupia.html")


# Statistics
@app.route("/stats", methods=["GET","POST"])
def stats():
    if request.method=="GET":
        return "<html lang='en'> <head> <meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'> <link rel='icon' type='image/png' href='https://cdn.glitch.global/d50c3bf5-4178-464c-a6a4-e664989a272b/favicon.png'> <title>Rafael Cordeiro's Portfolio</title></head> <body><br><br><br><center><h2>Sorry!</h2><br><h4>This page is password protected</div> </body> </html>"    
    else:
        password = request.form.get("password")
        if password != "132435":
            return "<html lang='en'> <head> <meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'> <link rel='icon' type='image/png' href='https://cdn.glitch.global/d50c3bf5-4178-464c-a6a4-e664989a272b/favicon.png'> <title>Rafael Cordeiro's Portfolio</title></head> <body><br><br><br><center><h2>Sorry!</h2><br><h4>This page is password protected</div> </body> </html>"    
        else:
            client_ip = request.remote_addr
            f = open("visitors.txt", "r")
            visitors = f.readlines()
            f.close()
            return render_template("stats.html", client_ip=client_ip, visitors = visitors)


# Temporary page
@app.route("/temp")
def temp():
    return "<html lang='en'> <head> <meta charset='utf-8'><meta name='viewport' content='width=device-width, initial-scale=1'> <link rel='icon' type='image/png' href='https://cdn.glitch.global/d50c3bf5-4178-464c-a6a4-e664989a272b/favicon.png'> <title>Rafael Cordeiro's Portfolio</title></head> <body><br><br><br><center><h2>Sorry!</h2><br><h4>This portfolio page is currently under development and will be released (very) soon.</div> </body> </html>"


# Route to manage the login.html page
@app.route("/login", methods=["GET", "POST"])
def login():
    #Log user in

    # Forget any user_id
    session.clear()

    # User reached route via POST (as by submitting a form via POST)
    if request.method == "POST":

        # Sets up database connection
        connect = sqlite3.connect("bookmovie.db")
        connect.row_factory = sqlite3.Row
        cursor = connect.cursor()

        username = request.form.get("username")
        
        # Ensure username was submitted
        if not username:
            return message("must provide username", 403)

        # Ensure password was submitted
        elif not request.form.get("password"):
            return message("must provide password", 403)

        # Query database for username
        cursor.execute("SELECT * FROM users WHERE username = ?", [username])
        row = cursor.fetchall()
        print("1.row: ",row)
        print("2.row[0]: ",row[0])
        print("3.row[0]['id']: ",row[0]['id'])
        # Ensure username exists and password is correct
        if len(row) != 1 or not check_password_hash(row[0]["hash"], request.form.get("password")):
            return message("invalid username and/or password", 403)

        # Remember which user has logged in
        session["user_id"] = row[0]["id"]
        print("4. user logged in for user_id:", row[0]["id"])

        # Redirect user to home page
        return redirect("/")

    # User reached route via GET (as by clicking a link or via redirect)
    else:
        return render_template("login.html")


# Route for user logout. This is the same as used in CS50's Problem Set Finance
@app.route("/logout")
def logout():
    #Log user out

    # Forget any user_id
    session.clear()

    # Redirect user to login form
    return redirect("/")


# Route that manages register.html page, and is responsible for inserting new users in the database
@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        # Sets up database connection
        with sqlite3.connect("bookmovie.db") as db:
            cursor = db.cursor()
                
        # Sets up variable names
        username = request.form.get("username")
        password = request.form.get("password")
        confirmation = request.form.get("confirmation")
        email= request.form.get("email")

        # Check if email is blank
        if not email:
            return message("must provide email", 400)

        # Check if username is blank
        if not username:
            return message("must provide username", 400)

        # Check if username already exists      
        cursor.execute("SELECT * FROM users WHERE username = ?", [username])
        usernameDB = cursor.fetchall()
        print("1.usernameDB: ",usernameDB)

        if usernameDB:
            return message("User already exists", 400)

        # Checks if password is null or if confirmation matches password
        if not password:
            return message("Must provide password", 400)

        # Checks if confirmation matches password
        if password != confirmation:
            return message("Both passwords must match", 400)

        # Hash the password
        hash = generate_password_hash(password, method='pbkdf2:sha256', salt_length=8)

        # Insert new user to database
        cursor.execute("INSERT INTO users (username,hash,email) VALUES (?,?,?)",(username,hash,email))
        db.commit()
        print("2.new user successfully added")

        # Starts session for the newest registered user
        cursor.execute("SELECT id FROM users WHERE username = ?", [username])
        recordData = cursor.fetchall()
        user_id = recordData[0][0]
        print("3.user_id: ",user_id)
        session["user_id"] = user_id#[0]["id"]
        print("4.session started for user_id: ", user_id)

        # Redirect user to home page
        return redirect("/")

    else:
        # method is GET
        return render_template("register.html")