
from flask import Flask, make_response, request, render_template, session, url_for, redirect, abort,flash
from wtforms import StringField, PasswordField, Form, validators,SubmitField
import psycopg2.extras
import re
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_wtf import FlaskForm
from wtforms.validators import DataRequired
from werkzeug.security import generate_password_hash,check_password_hash
from flask import session

app = Flask(__name__)
app.secret_key = 'HonarDast'


conn=psycopg2.connect(dbname="User",user="postgres",password="root",port=5432)





@app.route('/',methods=['POST','GET'])
def index():
   return render_template('index.html')


@app.route('/signup', methods=['GET', 'POST'])
def register():
    cursor=conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    #check if username and password are exist?

    if request.method == 'POST' and 'username' in request.form and 'pass' in request.form and 'email' in request.form :

     #creat variables of username and ...
     fullname=request.form['fullName']
     username=request.form['username']
     password=request.form['pass']
     email=request.form['email']
     city=request.form['city']
     tel=request.form['tel']
     postcode=request.form['postcode']
     address=request.form['address']

# Validate phone number and password and email format
     if not re.match(r'^\+?1?\d{9,15}$', tel):
         flash("Invalid phone number format. It should be +1234567890.")
     if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$', password):
         flash("Invalid password format. It should contain at least one letter, one number, and be at least 8 characters long.")
     if not re.match(r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$', email):
         flash("Invalid email format.")

     #hashing the password for security purposes
     hashed_password=generate_password_hash(password)
     #hashed_password = hashed_password.decode("utf-8", "ignore")

     #check if account exist with postgres
     cursor.execute('SELECT * FROM user_info')
     account=cursor.fetchone()
     print(account)

     #if account exits show error and validate check
    
        #account doesnt exits and the form data is valid ,now insert the data to database table
     
     
     cursor.execute("INSERT INTO user_info (fullname,username,password,email,city,postcode,address,tel) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)",(fullname,username,hashed_password,email,city,postcode,address,tel))
     conn.commit()
     return redirect(url_for('login'))
     
    
    return render_template('signup.html')



@app.route('/forget',methods=['GET','POST'])
def forget():
   return render_template('forget.html')

#//////////////////////login section
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

class User(UserMixin):
    def __init__(self, id,username):
        self.id = id
        self.username = username


@login_manager.user_loader
def load_user(user_id):
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM user_info WHERE id = %s", (user_id,))
    user = cursor.fetchone()
    if user:
        return User(user['id'],user['username'])
    return None

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
         return redirect(url_for('dashboard'))

    if request.method == 'POST':
        
        username = request.form['username']
        password = request.form['pass']
        cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
        cursor.execute("SELECT * FROM user_info WHERE username = %s", (username,))
        user = cursor.fetchone()
        if user and check_password_hash(user['password'], password):
         user_obj = User(user['id'], user['username'])
         login_user(user_obj)

         return redirect(url_for('dashboard'))
        else:
            flash('Invalid username or password')
    return render_template('login.html')



@app.route('/dashboard')
@login_required
def dashboard():
    if not current_user.is_authenticated:
        return redirect(url_for('login'))
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    cursor.execute("SELECT * FROM user_info WHERE id = %s", (current_user.id,))
    user = cursor.fetchone()
    return render_template('dashboard.html', user=user)

@app.route('/logout')
@login_required
def logout():
    session.pop('user_id', None)
    return redirect(url_for('index'))

@app.route('/order',methods=['POST','GET'])
def order():
   return render_template('order.html')

@app.route('/success',methods=['GET','POST'])
def success():
   return  'logged in successfully'

@app.route('/rules',methods=['POST','GET'])
def rules():
   return render_template('rules.html')

@app.route('/products',methods=['POST','GET'])
def products():
   return render_template('products.html')

@app.route('/submit',methods=['POST','GET'])
def submit():
   return render_template('submit.html')

@app.route('/buy',methods=['POST','GET'])
def buy():
   return render_template('buy.html')

@app.route('/discount_code',methods=['POST','GET'])
def discount_code():
   return render_template('discount_code.html')

@app.route('/new',methods=['POST','GET'])
def new():
   return render_template('new.html')

if __name__ == '__main__':
    app.run(debug=True)
