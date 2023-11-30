from flask import Flask, render_template, request, jsonify, url_for, redirect
import os
import json
from urllib.parse import unquote
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

@app.route("/business/<path:business_data>")
def business_detail(business_data):
    try:
        # URL-decode and parse the business JSON data
        decoded_data = unquote(business_data)  # URL-decode the string
        business_info = json.loads(decoded_data)  # Convert JSON string to a Python dictionary

        # Now you can access individual fields of the business object
        business_name = business_info.get('name', 'Unknown Business')
        # More fields can be accessed as needed
    except json.JSONDecodeError:
        business_name = 'Invalid Business Information'
        # Handle other fields as necessary

    # Pass the business information to your template
    return render_template("business_details.html", api_key=API_KEY, business_name=business_name)


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
