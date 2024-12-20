from flask import Flask, jsonify
import os
import requests

app = Flask(__name__)

@app.route('/api/weather/<city>', methods=['GET'])
def get_weather(city):
    api_key = os.getenv('2acb9bf87526cee54b5ffb38eaf74f08')  # Get the API key from environment variables
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric'
    
    response = requests.get(url)
    if response.status_code == 200:
        return jsonify(response.json())  # Return weather data as JSON
    else:
        return jsonify({"error": "City not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)
