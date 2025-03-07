from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

COMMENTS_FILE = "comments.json"

# Load comments from file
def load_comments():
    if os.path.exists(COMMENTS_FILE):
        with open(COMMENTS_FILE, "r") as file:
            return json.load(file)
    return []

# Save comments to file
def save_comments(comments):
    with open(COMMENTS_FILE, "w") as file:
        json.dump(comments, file, indent=2)

# API endpoint to get comments
@app.route("/get-comments", methods=["GET"])
def get_comments():
    return jsonify(load_comments())

# API endpoint to add a comment
@app.route("/add-comment", methods=["POST"])
def add_comment():
    data = request.json
    comment = data.get("comment")
    if comment:
        comments = load_comments()
        comments.append(comment)
        save_comments(comments)
        return jsonify({"message": "Comment added"}), 201
    return jsonify({"message": "Invalid comment"}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
