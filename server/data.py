from pymongo import MongoClient

# เชื่อมต่อ MongoDB
mongo = MongoClient('')
db = mongo['AI_KHIM']

# เลือก collection "users"
users_collection = mongo.AI_KHIM.users
# ดึงข้อมูล users
user_data = users_collection.find()
# แสดงข้อมูลผู้ใช้
for user in user_data:
    print(user)
