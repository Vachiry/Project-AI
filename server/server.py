from flask import Flask, request, jsonify, render_template, url_for, Blueprint, redirect, session, abort;
from flask_pymongo import PyMongo
from bson import ObjectId
from pymongo import MongoClient , ReturnDocument
import json
from flask_cors import CORS
import jwt
import bcrypt
from flask_bcrypt import Bcrypt
import bcrypt


app = Flask(__name__)
CORS(app, supports_credentials=True, origins='http://127.0.0.1:5173', methods=['GET', 'POST'], headers=['Content-Type'])
bcrypt = Bcrypt(app)

mongo = MongoClient('mongodb+srv://safe32785:Nongsafe32785@cluster0.gjhysqb.mongodb.net/')
db = mongo['mydb']


@app.route("/")
def index():
    # return "KUY_ZEN"
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
            'user_id': str(user.get('user_ID')),  # Convert ObjectId to string
            'user_name': user.get('user_name'),
            'user_surname': user.get('user_surname'),
            'user_age': user.get('user_age'),
            'user_sex': user.get('user_sex'),
            # Add other fields as needed
        })
    return jsonify({'users': users_data}), 200

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
@app.route('/LogIn', methods=['POST','GET'])
def SignIn():
    try:
        data = request.json
        # credentials = data.get('credentials', {})
        # email = credentials.get('admin_email')
        # username = credentials.get('admin_username')
        # password = data.get('admin_password')
      

        email = data.get('email')
        username = data.get('username')
        password = data.get('password')
        
          
        users_collection = mongo.mydb.admin
    
        user = users_collection.find_one({
            '$or': [
                {'admin_username': username},
                {'admin_email': email}
            ]
       })
      
   
        
        if user and user['admin_password'] == password:
           token = jwt.encode({'admin_username': username, 'admin_email': email}, SECRET_KEY, algorithm='HS256')
           return jsonify({'token': token, 'admin_username': user['admin_email']}), 200
        
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
        data = request.json
        user_ID = data.get('user_ID')

        users_collection = mongo.mydb.users
        user_ID = int( user_ID)

        user = users_collection.find_one({'user_ID': user_ID})
        
       
        if user:
            user['_id'] = str(user['_id'])
            return jsonify({'message': 'User details retrieved successfully', 'data': user}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500
    



#--------------Display user detail on ShowInfo page--------------#   
@app.route('/getUserDetails', methods=['GET'])
def get_user_details():
    try:
        data = request.json
        user_ID = data.get('user_ID')

        if user_ID is None:
           return jsonify({'error': 'User ID is missing or invalid'}), 400

        users_collection = mongo.mydb.users
        user_ID = int(user_ID)

        user = users_collection.find_one({'user_ID': user_ID})

        if user:
           user['_id'] = str(user['_id'])
           return jsonify({'message': 'User details retrieved successfully', 'data': user}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

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

#--------------------------Model---------------------------#   
@app.route('/Model', methods=['POST'])
def Model():
    try:
        audiofile = request.files['audio']
        data = request.form.get('data')
        user_ID = None
        Question_ID = None

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
        }
        answer_collection.insert_one(answer_data)
        return jsonify({'text': result}), 200
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/users', methods=['GET'])
def get_apiusers():

    users_collection = mongo.mydb.users
    user_data = users_collection.find()
    users = json_util.dumps(user_data)
    
    return jsonify({'users': users})


if __name__ == '__main__':
    app.run(debug=True)