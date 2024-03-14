import json
from typing import List
from fastapi import FastAPI, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"], 
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Load the mock data from the JSON file
with open("data/data.json", "r") as f:
    mock_data = json.load(f)


@app.get("/api/posts")
def get_posts(start: int = Query(0, ge=0), limit: int = Query(10, ge=1)):
    # Slicing the data list based on the start parameter
    posts: List = mock_data[start:start+limit]
    return JSONResponse(posts)

@app.put("/api/posts/{post_url}/hugs")
def update_post_hugs(post_url: str):
    for post in mock_data:
        if post["post_url"] == post_url:
            post["num_hugs"] += 1
            break
    return JSONResponse({"message": "Hugs updated successfully"})

@app.post("/api/posts/{post_url}/comments")
def add_comment(post_url: str, comment: dict = Body(...)):
    for post in mock_data:
        if post["post_url"] == post_url:
            comment_id = max(map(int, post["comments"].keys()), default=0) + 1
            new_comment = {
                "id": comment_id,
                "parent_id": None,
                "display_name": "User",
                "text": comment["text"],
                "created_at": "2024-03-13T00:00:00.000000"
            }
            post["comments"][str(comment_id)] = new_comment
            save_data_to_file()
            return JSONResponse(new_comment)
    return JSONResponse({"message": "Post not found"}, status_code=404)
    
def save_data_to_file():
    with open("data/data.json", "w") as f:
        json.dump(mock_data, f, indent=2)