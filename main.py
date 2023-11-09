from flask import Flask, render_template
from config import API_KEY

app = Flask(__name__)

@app.route("/")
def home_page():
    return render_template("index.html", api_key=API_KEY) 
