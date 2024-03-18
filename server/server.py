from flask import Flask, request, jsonify, render_template,  request, make_response, url_for, Blueprint, redirect, session, abort; 
from flask_pymongo import PyMongo
from bson import ObjectId
from pymongo import MongoClient , ReturnDocument
import json
from flask_cors import CORS
import jwt
from flask_bcrypt import Bcrypt
import bcrypt
import os
import torch
from transformers import pipeline
import uuid;
from bson import json_util
from flask_jwt_extended import jwt_required, unset_jwt_cookies
import datetime
import pytz

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=['http://127.0.0.1:5173'], methods=['GET', 'POST' , 'PUT' , 'DELETE'], headers=['Content-Type'])
#CORS(app, supports_credentials=True, origins='http://127.0.0.1:5173', methods=['GET', 'POST'], headers=['Content-Type'])
bcrypt = Bcrypt(app)

mongo = MongoClient('mongodb+srv://safe32785:Nongsafe32785@cluster0.gjhysqb.mongodb.net/')
db = mongo['mydb']

@app.route("/")
def index():
    return render_template("./index.html")

def generate_question_ID():
    return str(uuid.uuid4())

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
            #'user_ID': str(user.get('user_ID')),
            'user_ID': user.get('user_ID'), 
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
        user_ID = data.get('user_ID')
        user_name = data.get('user_name')
        user_surname = data.get('user_surname')
        user_age = data.get('user_age')
        user_sex = data.get('user_sex')
        # Add other fields as needed

        # Inserting new user data into the collection
        user_data = {
            'user_ID' : user_ID,
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






#--------------Display question on question page--------------#   
@app.route('/getquestion', methods=['GET'])
def get_question():
    try:
    
        question_ID = request.args.get('question_ID')

        if question_ID is None:
            return jsonify({'error': 'question_ID is missing or invalid'}), 400

        # Access the MongoDB collection for questions
        question_collection = mongo.mydb.questionaire
        try:
            question_ID = int(question_ID)
        except ValueError:
            return jsonify({'error': 'Invalid question ID format'}), 400
        # Find the question in the database
        questiondb = question_collection.find_one({'question_ID': question_ID})

        if questiondb:
        
            question_data = {
                'question_ID': questiondb.get('question_ID'),
                'question': questiondb.get('question')
                
            }
            return jsonify({'message': 'Question details retrieved successfully', 'data': question_data}), 200
        else:
            # If the question is not found, return an error response
            return jsonify({'message': 'Question not found'}), 404

    except Exception as e:
        # Handle other exceptions, such as database errors
        return jsonify({'error': str(e)}), 500



@app.route('/questionaire', methods=['GET', 'PUT'])
def handle_questionaire():
    if request.method == 'GET':
        # Handle GET request to retrieve questionaire data
        questionaire_collection = db['questionaire']
        result = questionaire_collection.find({})
        questionaire_data = [{
            'question_ID': item.get('question_ID'), 
            'question': item.get('question')} 
        for item in result]
        return json.dumps({'questionaire': questionaire_data}, ensure_ascii=False), 200
    
    elif request.method == 'PUT':
        # Handle PUT request to update an existing question
        request_data = request.json
        question_ID = request_data.get('question_ID')
        new_question = request_data.get('question')
    
    if not question_ID or not new_question:
        return jsonify({'error': 'Missing question_ID or question in request body'}), 400
    
    questionaire_collection = db['questionaire']
        # Update the existing document with the given question_ID
    questionaire_collection.update_one({'question_ID': question_ID}, {'$set': {'question': new_question}})
     
    return jsonify({'message': 'Question updated successfully'}), 200





@app.route('/addquestion', methods=['POST'])
def create_question():
    try:
       
        questionaire_collection = db['questionaire']
        
      
        data = request.json
       
        question_ID = data.get('question_ID')
        question = data.get('question')
        
        # Check if the question_ID already exists
        existing_question = questionaire_collection.find_one({'question_ID': question_ID})
        if existing_question:
            return jsonify({'error': 'Question ID already exists'}), 400
        
        if 'question' not in data:
            return jsonify({'error': 'Missing question field in the request data'}), 400
    
        questionaire_data = {
            'question_ID' : question_ID,
            'question': question}

        result =  questionaire_collection.insert_one(questionaire_data)
        return jsonify({'message': 'Question added successfully'}), 201

    except Exception as e:
     
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500
    
    

@app.route('/questionaire/<question_id>', methods=['DELETE'])
def delete_question(question_id):
    try:
        # Get the question from the database
        questionaire_collection = db['questionaire']
        question = questionaire_collection.find_one({'question_ID': question_id})

        # If the question exists, delete it
        if question:
            questionaire_collection.delete_one({'question_ID': question_id})
            return jsonify({'message': f'Question with ID {question_id} deleted successfully'}), 200
        else:
            return jsonify({'error': f'Question with ID {question_id} not found'}), 404
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500





@app.route('/admin', methods=['GET'])
def handle_admin():
   
        admin_collection = db['admin']
        result = admin_collection.find({})
        admin_data = []
        for item in result:
            admin_data.append({
                #'_id': str(item.get('_id')),
                'admin_name': item.get('admin_name'),
                'admin_surname': item.get('admin_surname'),
                'admin_username': item.get('admin_username'),
                #'admin_password': item.get('admin_password'),
                'admin_email': item.get('admin_email'),
                'admin_ID': item.get('admin_ID')
            })
        return jsonify({'admin': admin_data}), 200
    



@app.route('/admin/<admin_id>', methods=['DELETE'])
def delete_admin(admin_id):
    try:
        if request.method == 'DELETE':
            admin_collection = db['admin']
            admin = admin_collection.find_one({'admin_ID': admin_id})
            if admin:
                admin_collection.delete_one({'admin_ID': admin_id})
                return jsonify({'message': f'Admin with ID {admin_id} deleted successfully'}), 200
            else:
                return jsonify({'error': f'Admin with ID {admin_id} not found'}), 404
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/admin', methods=['PUT'])
def edit_admin():
    try:
        if request.method == 'PUT':
            request_data = request.json
            new_admin_ID = request_data.get('admin_ID')
            new_name = request_data.get('admin_name')
            new_surname = request_data.get('admin_surname')
            new_username = request_data.get('admin_username')
            new_email = request_data.get('admin_email')

            if not (new_name and new_surname and new_username and new_email and new_admin_ID):
                return jsonify({'error': 'Missing required fields in request body'}), 400

            admin_collection = db['admin']
            admin_collection.update_one({'admin_ID':  new_admin_ID}, {
                '$set': {
                   
                    'admin_name': new_name,
                    'admin_surname': new_surname,
                    'admin_username': new_username,
                    'admin_email': new_email
                }
            })

            return jsonify({'message': 'Admin updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500



@app.route('/choice', methods=['GET'])
def get_choice():

    # Accessing the 'admin' collection
    choice_collection = db['choice']
    # Retrieving all documents from the collection
    result = choice_collection.find({})
    # Building response data
    choice_data = []
    for item in result:
        choice_data.append({
            'choice_ID': item.get('choice_ID'),
            'choice': item.get('choice'),
            'type': item.get('type'),
            # 'answer': json.dumps(item.get('answer'), ensure_ascii=False).encode('utf-8').decode('utf-8')
        })  # Append the entire document
    return jsonify({'choice': choice_data}), 200 , {'Content-Type': 'application/json; charset=utf-8'}












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



#--------------------------Display answer-------------------------#  
@app.route('/GetAns', methods=['GET', 'POST'])
def GetAns():
    try:
        if request.method == 'GET':
            answer_collection = db['answer']
            result = answer_collection.find({})
            ans_list = [
                {
                    'user_ID': item.get('user_ID'),
                    'question_ID': item.get('question_ID'),
                    'answer': item.get('answer'),
                    'path': item.get('path'),
                    'timestamp': item.get('timestamp')
                } for item in result
            ]
            if not ans_list:
                return jsonify({'error': 'No answers found for the provided User ID and Question ID'}), 404
            return jsonify({'answer': ans_list}), 200

        elif request.method == 'POST':
            # Handle POST request to create a new answer
            data = request.json
            user_ID = data.get('user_ID')
            question_ID = data.get('question_ID')
            answer = data.get('answer')
            if user_ID is None or question_ID is None:
                return jsonify({'error': 'User ID or Question ID is missing'}), 400
            
            timestamp = datetime.datetime.now()
            answer_collection = db['answer']
            #current_time_gmt7 = datetime.now(pytz.timezone('Asia/Bangkok'))
            answer_data = {
                'user_ID': user_ID,
                'question_ID': question_ID,
                'answer': answer,
                'path': ' ',
                'timestamp': timestamp.strftime("%Y-%m-%d %H:%M:%S"),
            }
            answer_collection.insert_one(answer_data)
            return jsonify({'text': 'Answer stored successfully'}), 200

    except Exception as e:
        # Log the error for debugging purposes
        app.logger.error(f"Error: {str(e)}")
        # Return a generic error message to the client
        return jsonify({'error': 'An unexpected error occurred'}), 500


@app.route('/UpdateAns', methods=['PUT'])
def UpdateAns():
   
        # Get the data from the request
        data = request.json
        user_ID = data.get('user_ID')
        question_ID = data.get('question_ID')
        new_answer = data.get('answer')
   
        # Ensure the provided User ID and Question ID are valid
        if user_ID is None or question_ID is None:
            return jsonify({'error': 'User ID or Question ID is missing'}), 400

        # Access the answer collection in the database
        answer_collection = db['answer']     
        # Find the answer document to update
        answer_collection.update_one({'user_ID': user_ID, 'question_ID': question_ID},{'$set': {'answer': new_answer}})
            
        return jsonify({'message': 'Answer updated successfully'}), 200


@app.route('/UpdateAns/<user_id>/<question_id>', methods=['DELETE'])
def delete_answer(user_id, question_id):
    try:
        # Get the answer from the database
        answer_collection = db['answer']
        answer = answer_collection.find_one({'user_ID': user_id, 'question_ID': question_id})

        # If the answer exists, delete it
        if answer:
            answer_collection.delete_one({'user_ID': user_id, 'question_ID': question_id})
            return jsonify({'message': f'Answer with user ID {user_id} and question ID {question_id} deleted successfully'}), 200
        else:
            print("Answer not found")
            return jsonify({'error': f'Answer with user ID {user_id} and question ID {question_id} not found'}), 404
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500


@app.route('/user_bloodpressure', methods=['GET'])
def get_user_bloodpressure():

    user_bloodpressure_collection = db['user_bloodpressure'] 
    result = user_bloodpressure_collection.find({})
    user_bloodpressure_data = []
    for item in result:
        user_bloodpressure_data.append({
            'user_ID': item.get('user_ID'),
            #'blood_pressure': item.get('blood_pressure'),
             'SYS': item.get('SYS'),
             'DIA': item.get('DIA'),
            'date': item.get('date')
        })  # Append the entire document
    return jsonify({'bloodpressure': user_bloodpressure_data}), 200


@app.route('/user_bloodpressure', methods=['POST'])
def save_user_bloodpressure():
    try:
        # Parse the JSON data from the request body
        data = request.json
        user_ID = data.get('user_ID')
        #blood_pressure = data.get('blood_pressure')
        SYS = data.get('SYS')
        DIA = data.get('DIA')

        if not user_ID or not SYS or not DIA:
            return jsonify({'error': 'Missing user_ID or blood_pressure in request'}), 400

        # Convert user_ID to integer (if needed)
        user_ID = int(user_ID)

        user_bloodpressure_collection = db['user_bloodpressure']
        timestamp = datetime.datetime.now()
        bloodpressure_data = {
            'user_ID': user_ID,
            #'blood_pressure': blood_pressure,
            'SYS': SYS,
            'DIA': DIA,
            'date': timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        }

        # Insert the document into the collection
        result = user_bloodpressure_collection.insert_one(bloodpressure_data)

        # Return a success response
        return jsonify({'message': 'Blood pressure data saved successfully', 'bloodpressure_id': str(result.inserted_id)}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#------------------------Login Admin------------------------#  
SECRET_KEY = "HospitalKiosk"
@app.route('/LogIn', methods=['POST'])
def SignIn():
    try:
        data = request.json
        email_or_username = data.get('email_or_username')
        password = data.get('password')
                 
        users_collection = mongo.mydb.admin
      
        # Check if input is an email
        if '@' in email_or_username:
            user = users_collection.find_one({'admin_email': email_or_username})
        else:
            user = users_collection.find_one({'admin_username': email_or_username})

        if user and user['admin_password'] == password:
           token = jwt.encode({'admin_username': user['admin_username'], 'admin_email': user['admin_email']}, SECRET_KEY, algorithm='HS256')
           return jsonify({'token': token, 'admin_username': user['admin_username']}), 200
        else:
            # User not found or password does not match
            return jsonify({'error': 'Invalid username or password'}), 401

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/getAdmindetail', methods=['GET'])
def get_Admindetail():
    try:
        admin_username = request.args.get('admin_username')

        if admin_username is None:
            return jsonify({'error': 'Admin name is missing or invalid'}), 400

        users_collection = mongo.mydb.admin

        admin = users_collection.find_one({'admin_username': admin_username})

        if admin:
            admin_data = {
                'admin_username': admin.get('admin_username'),
            }
            return jsonify({'message': 'Admin details retrieved successfully', 'data': admin_data}), 200
        else:
            return jsonify({'message': 'Admin not found'}), 401

    except Exception as e:
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
        admin_ID = data.get('admin_ID')
        users_collection = mongo.mydb.admin

        # Insert data into MongoDB
        user_data = {
            'admin_name': name,
            'admin_surname': surname,
            'admin_username': username,
            'admin_password': password,
            'admin_email': email,
            'admin_ID': admin_ID
        }

        result = users_collection.insert_one(user_data)

        return jsonify({'inserted_id': str(result.inserted_id)}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
    
#--------------------------Login for user-------------------------#  
@app.route('/LoginKiosk', methods=['POST'])
def userkiosk():
    try:
       
        data = request.json
        user_ID = data.get('user_ID')
    

        if user_ID is None:
            return jsonify({'error': 'User ID is missing'}), 400
    
        try:
            user_ID = int(user_ID)
        except ValueError:
            return jsonify({'error': 'Invalid User ID format'}), 400
        users_collection = mongo.mydb.users
        user = users_collection.find_one({'user_ID': user_ID})
       
        if user:
     
            token = jwt.encode({'user_ID': user_ID}, SECRET_KEY, algorithm='HS256')
            user['_id'] = str(user['_id'])
            return jsonify({'token': token, 'user_ID': user_ID}), 200
        else:
            return jsonify({'message': 'User not found'}), 404

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
    




#--------------Display user detail on ShowInfo page--------------#   
@app.route('/getUserDetails', methods=['GET'])
def get_user_details():
    try:

        user_ID = request.args.get('user_ID')   
    
        if user_ID is None:
           return jsonify({'error': 'User ID is missing or invalid'}), 400

        users_collection = mongo.mydb.users
       
        try:
            user_ID = int(user_ID)
        except ValueError:
            return jsonify({'error': 'Invalid User ID format'}), 400
        
        user = users_collection.find_one({'user_ID': user_ID})
        
        if user:
            user_data = {
                'user_ID': user.get('user_ID'),
                'user_name': user.get('user_name'),
                'user_surname': user.get('user_surname'),
                'user_age': user.get('user_age'),
                'user_sex': user.get('user_sex')
            }
            return jsonify({'message': 'User details retrieved successfully', 'data': user_data}), 200
        else:
            return jsonify({'message': 'User not found'}), 401

    except ValueError as ve:
        return jsonify({'error': f'Error converting user ID to integer: {str(ve)}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500






#--------------------------Model---------------------------#   
@app.route('/Model', methods=['POST'])
def Model():
    try:
        audiofile = request.files['audio']
        data = request.form.get('data')
        user_ID = None
        Question_ID = None  
        timestamp = datetime.datetime.now()

        if data:
            data = json.loads(data)
            user_ID = data.get('user_ID')
            Question_ID = data.get('Question_ID')
            print(user_ID)
            print(Question_ID)
        if audiofile:
            # Save the audio file to a specific location
            unique_filename = str(uuid.uuid4()) + '.wav'
            folder_path = f'./Audio/'
            if not os.path.exists(folder_path):
                os.makedirs(folder_path)
            print('save')
            audio_path = os.path.join(folder_path, unique_filename)
            audiofile.save(audio_path)
        MODEL_NAME = "biodatlab/whisper-th-medium-combined"
        lang = "th"

        device = 0 if torch.cuda.is_available() else "cpu"

        pipe = pipeline(
            task="automatic-speech-recognition",
            model=MODEL_NAME,
            chunk_length_s=30,
            device=device,
        )
        transcriptions = pipe(
            audio_path,
            batch_size=16,
            return_timestamps=False,
            generate_kwargs={"language": "<|th|>", "task": "transcribe"}
        )["text"]

        print(transcriptions)
        result = {
            'transcriptions':transcriptions
        }

        # Accessing the 'users' collection
        answer_collection = db['answer']

        answer_data = {
            'user_ID' : user_ID,
            'question_ID': Question_ID,
            'answer': transcriptions,
            'path': audio_path,
            'timestamp': timestamp.strftime("%Y-%m-%d %H:%M:%S"),
        }
        answer_collection.insert_one(answer_data)
        return jsonify({'text': result}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500



@app.route('/api/users', methods=['GET'])
def get_api_users():
    users_collection = db['users']
    user_data = users_collection.find()
    
    users = json_util.dumps(list(user_data)) 
    return jsonify({'users': users})


if __name__ == '__main__':
    app.run(debug=True)