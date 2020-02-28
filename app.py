from flask import Flask, request, jsonify #import main Flask class and request object
from flask_cors import CORS, cross_origin
app = Flask(__name__) #create the Flask app
CORS(app)
app.config["DEBUG"] = True
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/loan', methods=['POST'])
@cross_origin()
def qualifyLoan():
    req = request.get_json()
    print(req)
    if int(req['credit']) < 600:
    # if int(req['credit']) < 600:
        result = {"qualified": False, "message": "Sorry, but based on our metrics your loan can not be approved"}
        return jsonify(result)
    elif ((int(req['income']) * .2) < int(req['price'])):
        result = {"qualified": False, "message": "Sorry, but based on our metrics your loan can not be approved"}
        return jsonify(result)
    else:
        print("qualified")
        return jsonify({"Congratulations, your application has been approved!": True})

app.run()