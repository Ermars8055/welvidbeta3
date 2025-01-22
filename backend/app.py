from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

API_KEY = 'AIzaSyCak2ehBKtpDjT_FWnkFtSV5OBRHeeYhzM'
YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'

@app.route('/youtube-search', methods=['GET'])
def youtube_search():
    query = request.args.get('q', 'random')
    params = {
        'part': 'snippet',
        'q': query,
        'type': 'video',
        'key': API_KEY,
        'maxResults': 10
    }
    response = requests.get(YOUTUBE_API_URL, params=params)
    print('YouTube API response:', response.json())  # Debugging
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        print('Error:', response.status_code, response.text)  # Debugging
        return jsonify({'error': 'Failed to fetch data'}), response.status_code


if __name__ == '__main__':
    app.run(debug=True)
