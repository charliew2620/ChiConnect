from flask import Flask, render_template, request, jsonify, url_for, redirect
import os
from azure.cosmos import CosmosClient, PartitionKey, exceptions

API_KEY = os.environ.get('API_KEY')
ENDPOINT = os.environ.get('COSMOS_ENDPOINT')
KEY = os.environ.get('COSMOS_KEY')
if (KEY[-2:] != "=="):
    KEY += "=="

app = Flask(__name__, static_url_path='/static', static_folder='static')
db_client = CosmosClient(url=ENDPOINT, credential=KEY)

app.jinja_env.variable_start_string = '[['
app.jinja_env.variable_end_string = ']]'


@app.route("/add_business", methods=['POST'])
def add_business():
    # query = request.args.get('query')
    # print(f'user searched for: {query}')
    return render_template("add_business.html", api_key=API_KEY)

@app.route("/", methods=['GET', 'POST'])
def home_page():
    print("home page reached")
    # return render_template("index.html", api_key=API_KEY, search_query=search_query)
    return render_template("index.html", api_key=API_KEY)

# @app.route(".")

@app.route("/health", methods=['GET'])
def health():
    return "<h1>Healthy</h1>"

if __name__ == "__main__":
    app.run()
