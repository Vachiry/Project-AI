from pymongo import MongoClient

# เชื่อมต่อ MongoDB
mongo = MongoClient('mongodb+srv://safe32785:Nongsafe32785@cluster0.gjhysqb.mongodb.net/')
db = mongo['mydb']

# เลือก collection "users"
users_collection = mongo.mydb.users
# ดึงข้อมูล users
user_data = users_collection.find()
# แสดงข้อมูลผู้ใช้
for user in user_data:
    print(user)