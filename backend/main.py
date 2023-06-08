from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import pymysql
from flask_cors import CORS

from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager, create_access_token, \
    create_refresh_token, jwt_required, get_jwt_identity

from dotenv import load_dotenv
import os

from datetime import datetime, timedelta

load_dotenv()

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
    os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config['JWT_TOKEN_LOCATION'] = ['headers']
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(minutes=30)
app.config['JWT_REFRESH_TOKEN_EXPIRES'] = timedelta(days=30)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

db = SQLAlchemy(app)

bcrypt = Bcrypt(app)
jwt = JWTManager(app)


# models
##############################################################################
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    user_firstname = db.Column(db.String(80), nullable=False)
    user_lastname = db.Column(db.String(80), nullable=False)
    user_password_hash = db.Column(db.String(80), nullable=False)
    user_is_admin = db.Column(db.Boolean, default=False, nullable=False)

class UserWeight(db.Model):
    weight_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    weight_date_entered = db.Column(db.String(80), nullable=False,
                             default=datetime.utcnow)

    user = db.relationship('User', backref=db.backref('weights', lazy=True))

class UserNutrition(db.Model):
    nutrition_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    ingredient_id = db.Column(db.Integer, nullable=False)
    ingredient_name = db.Column(db.String(80), nullable=False)
    servings = db.Column(db.Integer, nullable=False)
    unit = db.Column(db.String(40), nullable=False)
    date_entered = db.Column(db.String(80), nullable=False,
                            default=datetime.utcnow)
    period_of_day = db.Column(db.String(20), default="Breakfast")

    # nutrition
    calories = db.Column(db.String(80), default="0")
    fat = db.Column(db.String(80), default="0")
    saturated = db.Column(db.String(80) , default="0")
    polyunsaturatedfat = db.Column(db.String(80), default="0")
    monounsaturatedfat = db.Column(db.String(80), default="0")
    transfat = db.Column(db.String(80), default="0")
    cholesterol = db.Column(db.String(80), default="0")
    sodium = db.Column(db.String(80), default="0")
    potassium = db.Column(db.String(80), default="0")
    carbohydrates = db.Column(db.String(80), default="0")
    fiber = db.Column(db.String(80), default="0")
    sugar = db.Column(db.String(80), default="0")
    protein = db.Column(db.String(80), default="0")

    user = db.relationship('User', backref=db.backref('calories', lazy=True))

# end of models
##############################################################################
@app.route('/seed')
def initialize_database():
    # Drop all existing tables
    db.drop_all()

    # Create the tables
    db.create_all()

    # Create some example users
    user1 = User(username='admin@admin', user_firstname="admin",
                     user_lastname="jesus",
                user_password_hash=bcrypt.generate_password_hash(
                    "admin").decode(
                     'utf-8'),
                 user_is_admin=True)

    user1weight = UserWeight(user_id="1", weight="80",
                             weight_date_entered="01-01-1992")
    user1calories = UserNutrition(user_id = "1", date_entered=None,
                                 calories="300",
                                 ingredient_id="123",
                                ingredient_name="food",
                                servings="1",
                                unit = "kg")
    user2 = User(username='mary@gmail.com', user_firstname="mary",
                 user_lastname="mee",
                 user_password_hash=bcrypt.generate_password_hash(
                     "hash").decode(
                     'utf-8'))


    user2weight = UserWeight(user_id="2", weight="70", weight_date_entered =
    "01-02-1992")
    user2calories = UserNutrition(user_id="2", date_entered=None,
                                 calories="500",
                                 ingredient_id="321",
                                 ingredient_name="food",
                                 servings = "1",
                                 unit = "kg"
    )

    # Add the users to the session
    db.session.add(user1)
    db.session.add(user2)
    db.session.add(user1weight)
    db.session.add(user2weight)
    db.session.add(user1calories)
    db.session.add(user2calories)

    # Commit the changes to the database
    db.session.commit()

    return 'Database initialized'


@app.route('/users', methods=['GET'])
@jwt_required()
def get_users():
    users = db.session.query(User)

    rows = []
    for user in users:
        user_data = {
            'user_id': user.user_id,
            'username': user.username,
            'user_firstname': user.user_firstname,
            'user_lastname': user.user_lastname,
            'user_is_admin': user.user_is_admin,
        }
        rows.append(user_data)

    return jsonify({'users': rows})


@app.route('/addfood', methods=['PUT'])
def add_food():
    data = request.json
    user_id = data.get('user_id')

    # Check if user_id exists in the request body
    if user_id is None:
        return jsonify({'error': 'user_id is missing'}), 400

    # Create a new UserNutrition object
    nutrition = UserNutrition(user_id=user_id,
                              date_entered=data.get("date_entered"),
                              ingredient_id=data.get("ingredient_id"),
                              ingredient_name=data.get('name'),
                              servings=data.get("servings"),
                              unit=data.get("unit"),
                              period_of_day=data.get("dayPeriod"))

    # Add more key-value assignments for other nutrition attributes
    nutrition.calories = data.get('Calories')
    nutrition.fat = data.get('Fat')
    nutrition.saturated = data.get('Saturated')
    nutrition.polyunsaturatedfat = data.get('Poly Unsaturated Fat')
    nutrition.monounsaturatedfat = data.get('Mono Unsaturated Fat')
    nutrition.transfat = data.get('Trans Fat')
    nutrition.cholesterol = data.get('Cholesterol')
    nutrition.sodium = data.get('Sodium')
    nutrition.potassium = data.get('Potassium')
    nutrition.carbohydrates = data.get('Carbohydrates')
    nutrition.fiber = data.get('Fiber')
    nutrition.sugar = data.get('Sugar')
    nutrition.protein = data.get('Protein')

    # Add the nutrition object to the session and commit the changes
    db.session.add(nutrition)
    db.session.commit()

    return jsonify({'message': 'UserNutrition added successfully'}), 200


@app.route('/getuserfoods', methods=['POST'])
@jwt_required()
def get_userfoods():
    data = request.json
    user_id = data.get('user_id')
    date_entered = data.get('date_entered')

    # Check if user_id, and date_entered are provided
    if not user_id or not date_entered:
        return jsonify({'error': 'Incomplete parameters'}), 400

    # Retrieve nutrients based on the provided parameters
    nutrients = db.session.query(UserNutrition).\
        join(User, User.user_id == UserNutrition.user_id).\
        filter(UserNutrition.user_id == user_id,
               UserNutrition.date_entered == date_entered).all()

    # Prepare the response data
    nutrient_data = []
    for nutrient in nutrients:
        nutrient_data.append({
        "ingredient_id" : nutrient.ingredient_id,
        "ingredient_name" : nutrient.ingredient_name,
        "nutrition_id": nutrient.nutrition_id,
        "servings" : nutrient.servings,
        "unit" : nutrient.unit,
        "date_entered" : nutrient.date_entered,
        "period_of_day" : nutrient.period_of_day,
        "Calories": nutrient.calories,
        "Carbohydrates": nutrient.carbohydrates,
        "Fat": nutrient.fat,
        "Protein": nutrient.protein,
        "Sodium": nutrient.sodium,
        "Sugar": nutrient.sugar
            # Include other nutrient attributes
        })

    return jsonify({'nutrients': nutrient_data}), 200

@app.route('/delete_nutrition', methods=['DELETE'])
def delete_nutrition():
    nutrition_id = request.json.get('nutrition_id')

    if nutrition_id is None:
        return jsonify({'error': 'nutrition_id is missing'}), 400

    # Find the UserNutrition row with the given nutrition_id
    nutrition = UserNutrition.query.get(nutrition_id)

    if nutrition is None:
        return jsonify({'error': 'Nutrition entry not found'}), 404

    # Delete the row from the database
    db.session.delete(nutrition)
    db.session.commit()

    return jsonify({'message': 'Nutrition entry deleted successfully'})

@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    user_firstname = request.json.get('user_firstname')
    user_lastname = request.json.get('user_lastname')
    password = request.json.get('password')

    if not username or not password or not user_firstname or not user_lastname:
        return jsonify({'message': 'Username and password are required'}), 400

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists'}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(username=username, user_password_hash=hashed_password,
                    user_firstname=user_firstname,
                    user_lastname=user_lastname)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

# Login endpoint
@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username')
    password = request.json.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password are required'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'Invalid username or password'}), 401

    if bcrypt.check_password_hash(user.user_password_hash, password):
        access_token = create_access_token(identity=user.user_id)
        refresh_token = create_refresh_token(identity=user.user_id)
        user_id = user.user_id
        user_is_admin = user.user_is_admin
        return jsonify({'access_token': access_token, 'refresh_token':
            refresh_token, 'user_id': user_id, 'user_is_admin': user_is_admin}), 200


@app.route('/relogin', methods=['GET'])
@jwt_required(refresh=True)
def relogin():
    user_id = get_jwt_identity()
    print(user_id)

    if not user_id:
        return jsonify({'message': 'User ID is required'}), 400

    # Find the User row with the given user_id
    user = db.session.get(User, user_id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    access_token = create_access_token(identity=user.user_id)
    user_id = user.user_id
    user_is_admin = user.user_is_admin
    return jsonify({'access_token': access_token, 'user_id': user_id, 'user_is_admin': user_is_admin}), 200

@app.route('/refresh_token', methods=['POST'])
@jwt_required(refresh=True)
def refresh_token():
    current_user = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user)
    return jsonify({'access_token': new_access_token}), 200

@app.route('/delete_user', methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = request.json.get('user_id')

    if user_id is None:
        return jsonify({'error': 'user_id is missing'}), 400

    # Find the User row with the given user_id
    user = db.session.get(User, user_id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    try:
        # Delete associated rows from other tables
        UserWeight.query.filter_by(user_id=user_id).delete()
        UserNutrition.query.filter_by(user_id=user_id).delete()

        # Delete the user row from the database
        db.session.delete(user)
        db.session.commit()

        return jsonify({'message': 'User and associated data deleted successfully'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to delete user and associated data'}), 500

@app.route('/add_weight', methods=['POST'])
@jwt_required()
def add_weight():
    user_id = request.json.get('user_id')
    weight = request.json.get('weight')
    weight_date_entered = request.json.get("date_entered")

    if not user_id or not weight or not weight_date_entered:
        return jsonify({'error': 'Incomplete parameters'}), 400

    try:
        # Check if the weight entry for the given date already exists
        existing_weight = UserWeight.query.filter_by(user_id=user_id,
                                                     weight_date_entered=weight_date_entered).first()

        if existing_weight:
            # Overwrite the existing weight entry with the new weight value
            existing_weight.weight = weight
            db.session.commit()
            return jsonify({'message': 'Weight updated successfully'}), 200
        else:
            # Create a new UserWeight object
            new_weight = UserWeight(user_id=user_id, weight=weight,
                                    weight_date_entered=weight_date_entered)
            db.session.add(new_weight)
            db.session.commit()
            return jsonify({'message': 'Weight added successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Failed to add weight'}), 500

@app.route('/user_weights', methods=['POST'])
@jwt_required()
def get_user_weights():
    user_id = request.json.get('user_id')

    if user_id is None:
        return jsonify({'error': 'user_id is missing'}), 400

    # Find the user with the provided user_id
    user = User.query.get(user_id)

    if user is None:
        return jsonify({'error': 'User not found'}), 404

    # Retrieve all UserWeight rows belonging to the user
    weights = UserWeight.query.filter_by(user_id=user_id).all()

    # Prepare the response data
    weight_data = []
    for weight in weights:
        weight_data.append({
            'user_id': weight.user_id,
            'weight': weight.weight,
            'weight_date_entered': weight.weight_date_entered
        })

    return jsonify({'weights': weight_data}), 200

if __name__ == '__main__':
    app.run()
