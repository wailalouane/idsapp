from flask import Flask, Response, json
import time
import pandas as pd
from flask_cors import CORS
from agents import AnalyzerAgent, ClassifierAgent, EncoderAgent, SnifferAgent
import agents 

DELAY = 5 

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins":[ "http://localhost:3000", "*"]}})

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

@app.route('/')
def index():
    # Analyzer
    analyzer = AnalyzerAgent("zazaxk4@jabber.hot-chilli.net", "5UkBgcXsGnSMnj#")
    future_analyzer = analyzer.start()
    future_analyzer.result() # wait for agent to be prepared.
    # Classifier
    classifier = ClassifierAgent("zazaxk3@jabber.hot-chilli.net", "5UkBgcXsGnSMnj#")
    future_classifier = classifier.start()
    future_classifier.result() # wait for agent to be prepared.
    # Encoder
    encoder = EncoderAgent("zazaxk2@jabber.hot-chilli.net/encoded_packet", "5UkBgcXsGnSMnj#")
    future_encoder = encoder.start()
    future_encoder.result() # wait for agent to be prepared.
    # Sniffer
    sniffer = SnifferAgent("zazaxk@jabber.hot-chilli.net/sniffed_packet", "5UkBgcXsGnSMnj#")
    future_sniffer = sniffer.start()
    future_sniffer.result() # wait for agent to be prepared.

    def get_data():
        while True:
            time.sleep(DELAY)
            yield json.dumps([agents.bar_chart1, agents.alerts_table2, agents.pie_chart3, agents.bar_chart4])
    
    return Response(get_data(), mimetype="application/json")
    

if __name__ == '__main__':
    app.run(debug=True)
    
