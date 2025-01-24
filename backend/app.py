from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import logging

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Your YouTube API key
API_KEY = 'AIzaSyAAyzsKJPZwfdgfw49zoMWdciWn4yMwAJw'
YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search'

# Home route
@app.route('/')
def home():
    return "Welcome to the YouTube Search API!"

# YouTube search route
@app.route('/youtube-search', methods=['GET'])
def youtube_search():
    query = request.args.get('q', 'random')
    
    # YouTube API request parameters
    params = {
        'part': 'snippet',
        'q': query,
        'type': 'video',
        'key': API_KEY,
        'maxResults': 10
    }
    
    try:
        # Fetching data from YouTube API
        response = requests.get(YOUTUBE_API_URL, params=params)
        response.raise_for_status()  # Will raise an HTTPError for bad responses
        logger.info(f"Successfully fetched YouTube data for query: {query}")

        # Return JSON response
        return jsonify(response.json())
    
    except requests.exceptions.HTTPError as errh:
        logger.error(f"HTTP Error: {errh}")
        return jsonify({'error': 'Failed to fetch data from YouTube (HTTP error)'}), 500
    except requests.exceptions.RequestException as err:
        logger.error(f"Error: {err}")
        return jsonify({'error': 'Failed to fetch data from YouTube (Request error)'}), 500

if __name__ == "__main__":
    # Dynamically getting port from environment variable for Render
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if not set
    logger.info(f"Starting app on port {port}")
    
    # Run the app
    app.run(host="0.0.0.0", port=port)
