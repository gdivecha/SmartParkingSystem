from pymongo import MongoClient


def get_user_database():
    CONNECTION_STRING = "mongodb+srv://swaggermcpuff:e1oq3sKzIYmNorkg@cluster0.p8q45kn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(CONNECTION_STRING)
    return client["test"]["users"]


def get_parking_database():
    CONNECTION_STRING = "mongodb+srv://swaggermcpuff:e1oq3sKzIYmNorkg@cluster0.p8q45kn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(CONNECTION_STRING)
    return client["test"]["parking_spots"]


# Create
def insert_user(data):
    get_user_database().insert_one(data)


def insert_parking(data):
    get_parking_database().insert_one(data)


# Read
def get_user(email):
    db = get_user_database()
    return db.find_one({"email": email})


def get_parking(name):
    db = get_parking_database()
    return db.find_one({"name": name})


# Update
def update_user(email, newPassword):
    db = get_user_database()
    db.find_one_and_update({"email": email}, {"$set": {"password": newPassword}})


def update_parking_availability(name, email):
    db = get_user_database()
    db.find_one_and_update({"name": name}, {"$set": {"reservedBy": email}})


def update_parking_price(name, price):
    db = get_user_database()
    db.find_one_and_update({"name": name}, {"$set": {"price": price}})


# Delete
def delete_user(email):
    db = get_user_database()
    db.find_one_and_delete({"email": email}, projection=None, sort=None)


def delete_parking_spot(name):
    db = get_parking_database()
    db.find_one_and_delete({"name": name}, projection=None, sort=None)


if __name__ == "__main__":
    user_1 = {
        "email": "test@gmail.com",
        "password": "123",
    }

    parking_spot_1 = {
        "location": 1,
        "name": "one",
        "price": 10,
        "reservedBy": "test@gmail.com",
    }

    # insert_user(user_1)
    # insert_parking(parking_spot_1)
    # print(get_user("test@gmail.com"))
    # print(get_parking("one"))
    # update_user("test@gmail.com", "234")
    # delete_user("test@gmail.com")
