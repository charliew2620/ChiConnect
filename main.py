from flask import Flask, render_template, request, jsonify, url_for, redirect
from config import API_KEY

app = Flask(__name__)

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
    if request.method == 'POST':
        query = request.form.get('searchQuery', '')
        # Here you would typically process the search_query.
        # For now, we're just passing it back to the template.

        return redirect(url_for('search', query=query))

        # return render_template("index.html", api_key=API_KEY, search_query=search_query)
    return render_template("index.html", api_key=API_KEY)

# @app.route(".")

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
