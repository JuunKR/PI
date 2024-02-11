from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

def get_PI():
    with open('pi-billion.txt', 'r') as file:
        pi = file.read()
    return pi
PI = get_PI()

@app.get("/digits/{digits}")
def read_root(digits:int):
    global PI
    digits += 1
    value = PI[digits]
    return {"value": value}


