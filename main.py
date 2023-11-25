from flask import Flask, render_template, request, jsonify, url_for, redirect
import os, base64
from azure.cosmos import CosmosClient, PartitionKey, exceptions

# b64_string += "=" * ((4 - len(b64_string) % 4) % 4)
# b = base64.b64encode(bytes('H1HQcGI0N0kqlNkWZ9JuLfOt82lFkpOLUGLWW6N5EFK5ILRfwAuNQ5iMVfDzwKYh7MKhCdgiNaKpACDbhMXm6A==', 'utf-8')) # bytes
# base64_str = b.decode('utf-8') # convert bytes to string


API_KEY = os.environ.get('API_KEY')
ENDPOINT = os.environ.get('COSMOS_ENDPOINT')
KEY = os.environ.get('COSMOS_KEY')
if (KEY[-2:] != "=="):
    KEY += "=="

print(KEY)

app = Flask(__name__)
db_client = CosmosClient(url=ENDPOINT, credential=KEY)

app.jinja_env.variable_start_string = '[['
app.jinja_env.variable_end_string = ']]'


@app.route("/search", methods=['GET'])
def search():
    query = request.args.get('query')
    print(f'user searched for: {query}')
    return render_template("search.html", api_key=API_KEY, query=query)

# @app.route("/search/<input>", methods=['GET'])
# def search

@app.route("/", methods=['GET', 'POST'])
def home_page():
    print("home page reached")
    if request.method == 'POST':
        query = request.form.get('searchQuery', '')
        # Here you would typically process the search_query.
        # For now, we're just passing it back to the template.

        return redirect(url_for('search', query=query))

        # return render_template("index.html", api_key=API_KEY, search_query=search_query)
    return render_template("index.html", api_key=API_KEY)

# @app.route(".")

@app.route("/health", methods=['GET'])
def health():
    return "<h1>Healthy</h1>"

if __name__ == "__main__":
    app.run()
