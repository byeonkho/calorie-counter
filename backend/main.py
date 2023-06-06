from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import pymysql
from flask_cors import CORS
from datetime import datetime

pymysql.install_as_MySQLdb()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'mysql://user:2r4u7udlol@localhost:3306/sys'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
import pymysql
from datetime import datetime

pymysql.install_as_MySQLdb()

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'mysql://user:2r4u7udlol@localhost:3306/sys'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# models
##############################################################################
class User(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    user_firstname = db.Column(db.String(80), nullable=False)
    user_lastname = db.Column(db.String(80), nullable=False)
    user_password = db.Column(db.String(80), nullable=False)
    user_is_admin = db.Column(db.Boolean, default=True, nullable=False)

class UserWeight(db.Model):
    weight_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.user_id'), nullable=False)
    weight = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

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
    period_of_day = db.Column(db.String(20), default="Morning")

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

    # def __init__(self, user_id, date_entered, ingredient_id):
    #     self.user_id = user_id
    #     self.date_entered = date_entered
    #     self.ingredient_id = ingredient_id

# end of models
##############################################################################
@app.route('/seed')
def initialize_database():
    # Drop all existing tables (for testing purposes)
    db.drop_all()

    # Create the tables
    db.create_all()

    # Create some example users
    user1 = User(username='john', user_firstname="john",
                     user_lastname="nee",
                 user_password="pw")
    user1weight = UserWeight(user_id="1", weight="80")
    user1calories = UserNutrition(user_id = "1", date_entered=None,
                                 calories="300",
                                 ingredient_id="123",
                                ingredient_name="food",
                                servings="1",
                                unit = "kg"    )
    user2 = User(username='mary', user_firstname="mary", user_lastname="mee",
                 user_password="pw")
    user2weight = UserWeight(user_id="2", weight="70")
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
def get_users():
    users = db.session.query(User, UserWeight, UserNutrition).\
        join(UserWeight, User.user_id == UserWeight.user_id).\
        join(UserNutrition, User.user_id == UserNutrition.user_id).all()

    rows = []
    for user, weight, nutrition in users:
        user_data = {
            'user_id': user.user_id,
            'username': user.username,
            'user_firstname': user.user_firstname,
            'user_lastname': user.user_lastname,
            'user_password': user.user_password,
            'user_is_admin': user.user_is_admin,
            'weight_id': weight.weight_id,
            'weight': weight.weight,
            'timestamp': weight.timestamp,
            'nutrition_id': nutrition.nutrition_id,
            'date_entered': nutrition.date_entered,
            'calories': nutrition.calories,
            'fat': nutrition.fat,
            'saturated': nutrition.saturated,
            'polyunsaturatedfat': nutrition.polyunsaturatedfat,
            'monounsaturatedfat': nutrition.monounsaturatedfat,
            'transfat': nutrition.transfat,
            'cholesterol': nutrition.cholesterol,
            'sodium': nutrition.sodium,
            'potassium': nutrition.potassium,
            'carbohydrates': nutrition.carbohydrates,
            'fiber': nutrition.fiber,
            'sugar': nutrition.sugar,
            'protein': nutrition.protein
        }
        rows.append(user_data)

    return jsonify({'users': rows})


@app.route('/register', methods=['PUT'])
def add_user():
    # Retrieve user details from the request body
    data = request.get_json()
    username = data.get('username')
    user_firstname = data.get('user_firstname')
    user_lastname = data.get('user_lastname')
    user_password = data.get('user_password')

    # Create a new User instance
    new_user = User(username=username, user_firstname=user_firstname,
                    user_lastname=user_lastname, user_password=user_password)

    # Add the new user to the database session
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'New user added successfully'})

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
                              unit=data.get("unit"))

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

if __name__ == '__main__':
    app.run()
