from flask import Flask, request, jsonify, render_template, url_for, Blueprint, redirect, session;
from flask_pymongo import PyMongo
from bson import ObjectId
from pymongo import MongoClient
import json
from flask_cors import CORS
import jwt
import bcrypt
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# mongodb
db = mongo['AI_KHIM']


@app.route("/")
def index():
    # return "KUY_ZEN"
    return render_template("./index.html")

@app.route('/users', methods=['GET'])
def get_users():
    # Accessing the 'users' collection
    users_collection = db['users']
    # Retrieving documents from the collection
    result = users_collection.find({})
    # Building response data
    users_data = []
    for user in result:
        users_data.append({
            # 'user_id': str(user.get('user_ID')),  # Convert ObjectId to string
            'user_IDs': user.get('user_IDs'),
            'user_name': user.get('user_name'),
            'user_surname': user.get('user_surname'),
            'user_age': user.get('user_age'),
            'user_sex': user.get('user_sex'),
            # Add other fields as needed
        })
    return jsonify({'users': users_data}), 200



@app.route('/addusers', methods=['POST'])
def create_user():
    try:
        # Accessing the 'users' collection
        users_collection = db['users']

        # Parsing request data
        data = request.json
        user_IDs = data.get('user_IDs')
        user_name = data.get('user_name')
        user_surname = data.get('user_surname')
        user_age = data.get('user_age')
        user_sex = data.get('user_sex')
        # Add other fields as needed

        # Inserting new user data into the collection
        user_data = {
            'user_IDs' : user_IDs,
            'user_name': user_name,
            'user_surname': user_surname,
            'user_age': user_age,
            'user_sex': user_sex,
            # Add other fields as needed
        }
        result = users_collection.insert_one(user_data)

        return jsonify({'message': 'User created successfully', 'user_id': str(result.inserted_id)}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    


@app.route('/questionaire', methods=['GET'])
def get_questionaire():
    # Accessing the 'questionnaire' collection
    questionaire_collection = db['questionaire']
    # Retrieving all documents from the collection
    result = questionaire_collection.find({})
    # Building response data
    questionaire_data = []
    for item in result:
        questionaire_data.append({
            'question_ID': item.get('question_ID'),
            'question': item.get('question')
        })
    return jsonify({'questionaire': questionaire_data}), 200

@app.route('/admin', methods=['GET'])
def get_admin():
    # Accessing the 'admin' collection
    admin_collection = db['admin']
    # Retrieving all documents from the collection
    result = admin_collection.find({})
    # Building response data
    admin_data = []
    for item in result:
        admin_data.append({
            'admin_ID': item.get('admin_ID'),
            'admin_name': item.get('admin_name'),
            'admin_surname': item.get('admin_surname'),
            'admin_username': item.get('admin_username'),
            'admin_password': item.get('admin_password'),
            'admin_email': item.get('admin_email')
        })  # Append the entire document
    return jsonify({'admin': admin_data}), 200

@app.route('/answer', methods=['GET'])
def get_answer():

    # Accessing the 'admin' collection
    answer_collection = db['answer']
    # Retrieving all documents from the collection
    result = answer_collection.find({})
    # Building response data
    answer_data = []
    for item in result:
        answer_data.append({
            'answer_ID': item.get('answer_ID'),
            'answer': item.get('answer'),
            'ควย':json.dumps('ควย', ensure_ascii=False)
            # 'answer': json.dumps(item.get('answer'), ensure_ascii=False).encode('utf-8').decode('utf-8')
        })  # Append the entire document
    return jsonify({'answer': answer_data}), 200 , {'Content-Type': 'application/json; charset=utf-8'}

@app.route('/user_bloodpressure', methods=['GET'])
def get_user_bloodpressure():
    # Accessing the 'admin' collection
    user_bloodpressure_collection = db['user_bloodpressure']
    # Retrieving all documents from the collection
    result = user_bloodpressure_collection.find({})
    # Building response data
    user_bloodpressure_data = []
    for item in result:
        user_bloodpressure_data.append({
            'user_ID': item.get('user_ID'),
            'blood_pressure': item.get('blood_pressure'),
            'date': item.get('date')
        })  # Append the entire document
    return jsonify({'bloodpressure': user_bloodpressure_data}), 200


#------------------------Login Admin------------------------#  
SECRET_KEY = "HospitalKiosk"
@app.route('/LogIn', methods=['POST'])
def SignIn():
    try:
        data = request.json
        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        
          
        users_collection = mongo.AI_KHIM.admin
    
        user = users_collection.find_one({
            '$or': [
                {'admin_username': username},
                {'admin_email': email}
            ]
        })
        
        if user and user['admin_password'] == password:
             token = jwt.encode({'admin_username': username, 'admin_email': email}, SECRET_KEY, algorithm='HS256')
             return jsonify({'token': token, 'admin_email': user['admin_email']}), 200
        
        else:
            # User not found or password does not match
            return jsonify({'error': 'Invalid username or password'}), 401

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

#------------------------Register Admin------------------------#     
@app.route('/Register', methods=['POST'])
def Register():
    try:
        data = request.json
        name = data.get('name')
        surname = data.get('surname')
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        users_collection = mongo.AI_KHIM.admin

        # Insert data into MongoDB
        user_data = {
            'admin_name': name,
            'admin_surname': surname,
            'admin_username': username,
            'admin_password': password,
            'admin_email': email
        }

        result = users_collection.insert_one(user_data)

        return jsonify({'inserted_id': str(result.inserted_id)}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
#--------------------------Login for user-------------------------#  
@app.route('/Loginusers', methods=['GET'])
def userskiosk():
    try:
        user_IDs = request.args.get('user_IDs')

        if not user_IDs:
            return jsonify({'error': 'User ID is missing'}), 400

        users_collection = mongo.AI_KHIM.users

        user = users_collection.find_one({'user_IDs': user_IDs})

        if user:
            # สร้างข้อมูลผู้ใช้งานที่ส่งกลับไปยังหน้าผู้ใช้
            user_data = {
                'user_IDs': user.get('user_IDs'),
                'user_name': user.get('user_name'),
                'user_surname': user.get('user_surname'),
                'user_age': user.get('user_age'),
                'user_sex': user.get('user_sex')
            }
            return jsonify({'message': 'User details retrieved successfully', 'data': user_data}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


    

#--------------Display user detail on ShowInfo page--------------#   
@app.route('/getUserDetails', methods=['GET'])
def get_user_details():
    try:
        user_IDs = request.args.get('user_IDs')

        if not user_IDs:
            return jsonify({'error': 'User ID is missing'}), 400

        users_collection = mongo.AI_KHIM.users

        user = users_collection.find_one({'user_IDs': user_IDs})

        if user:
            # สร้างข้อมูลผู้ใช้งานที่ส่งกลับไปยังหน้าผู้ใช้
            user_data = {
                'user_IDs': user.get('user_IDs'),
                'user_name': user.get('user_name'),
                'user_surname': user.get('user_surname'),
                'user_age': user.get('user_age'),
                'user_sex': user.get('user_sex')
            }
            return jsonify({'message': 'User details retrieved successfully', 'data': user_data}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    app.run(debug=True)