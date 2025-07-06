"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/user', methods=['GET'])
def get_all_user():
    users = User.query.all()

    if not users:
        return jsonify({"error":"Users not found"}), 404
    
    return jsonify({"success":"Users"}, [user.serialize() for user in users]), 200


@api.route('/signup', methods=['POST'])
def signup():
    request_body = request.get_json()

    if not request_body.get('email') or not request_body.get('password'):
        return jsonify({"msg":"Email and password are required"}), 400
    
    user = User.query.filter_by(email=request_body['email']).first()
    if user:
        return jsonify({"msg": "Email already exists"}), 400


    hashed_password = generate_password_hash(request_body['password'])

    new_user = User(email=request_body['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"success":"A new user has been created"}), 201

@api.route('/login', methods=['POST'])
def login():
    request_body = request.get_json()
    email = request_body.get('email')
    password = request_body.get('password')
    user = User.query.filter_by(
        email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({"error":"Incorrect email or password, please try again"}), 400
    
    token = create_access_token(identity=user.email)

    return jsonify({"token": token}), 200

@api.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_email = get_jwt_identity()
    user = User.query.filter_by(email=user_email).first()

    if user is None:
        return ({"error":"User not found"}), 404
    
    return jsonify({"user": user.serialize()}), 200