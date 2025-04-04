# Run with uvicorn server:app --reload

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    email: str
    password: str

class ParkingSpot(BaseModel):
    location: str
    name: str
    price: float
    reservedBy: str

# Dummy Database
users = {}
parkingSpots = {}

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

@app.post("/signup")
def signup(user: User):
    print(users)  # 👈 See all registered users in terminal
    if user.email in users:
        raise HTTPException(status_code=400, detail="Email already registered")

    users[user.email] = {'password': user.password}
    return {"message": "User signed up successfully"}


@app.post("/login")
def login(user: User):
    if user.email not in users:
        raise HTTPException(status_code=400, detail="Email has no account created")
    if user.password != users[user.email]['password']:
        raise HTTPException(status_code=400, detail="Incorrect password")
    return {"message": "Login successful"}

@app.post("/addNewParkingSpot")
def add_new_parking_spot(parkingSpot: ParkingSpot):
    newParkingSpot = {'parkingName': parkingSpot.name, 'price': parkingSpot.price, 'reservedBy': None}
    if parkingSpot.location in parkingSpots:
        for spot in parkingSpots[parkingSpot.location]:
            if spot['parkingName'] == parkingSpot.name:
                raise HTTPException(status_code=400, detail="Parking spot name exists at location")
        parkingSpots[parkingSpot.location].append(newParkingSpot)
    else:
        parkingSpots[parkingSpot.location] = [newParkingSpot]
    return {"message": "Parking spot added successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
