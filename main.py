from flask import Flask, render_template, request
from config import API_KEY

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def home_page():
    if request.method == 'POST':
        search_query = request.form['searchQuery']
        # Here you would typically process the search_query.
        # For now, we're just passing it back to the template.
        return render_template("index.html", api_key=API_KEY, search_query=search_query)
    return render_template("index.html", api_key=API_KEY)

if __name__ == "__main__":
    app.run(debug=True)
