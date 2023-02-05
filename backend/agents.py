import time, os, sys
from spade.agent import Agent
from spade.behaviour import CyclicBehaviour
from spade.message import Message
from spade.template import Template
from sklearn.preprocessing import StandardScaler, LabelEncoder
import pandas as pd 
import csv
import pickle
import numpy as np
import json
from ast import literal_eval

TIMEOUT = 30

# RELEVANT DICTIONARIES
protocol_per_attack = {
    'dos': 'ICMP',
    'r2l': 'IP',
    'u2r': 'UDP',
    'probe': 'UDP'
}
service_per_attack = {
    'dos': 50,
    'r2l': 32,
    'u2r':  53,
    'probe':  46
}

# INCREMENTS
total_attacks = 0
total_normal = 0
total_DOS, total_R2L, total_U2R, total_PROBE = 0, 0, 0, 0
total_ICMP, total_UDP, total_TCP, total_IP, total_PP = 0, 0, 0, 0, 0

# CHARTS
bar_chart1 = []
alerts_table2 = []
pie_chart3 = []
bar_chart4 = []

# GLOBAL MESSAGES
sniffed_packets = []
encoded_packets = []
classified_packets = []

def update_attack(attack):
    global total_DOS, total_R2L, total_U2R, total_PROBE, total_PP, total_ICMP, total_IP, total_TCP, total_UDP
    protocol = protocol_per_attack[attack]
    if attack == "dos":
        total_DOS = total_DOS + 1
    elif attack == "r2l":
        total_R2L = total_R2L + 1
    elif attack == "u2r":
        total_U2R = total_U2R + 1
    elif attack == "probe":
        total_PROBE = total_PROBE+ 1

    if protocol == "ICMP":
        total_ICMP = total_ICMP + 1
    if protocol == "UDP":
        total_UDP = total_UDP+ 1
    elif protocol == "TCP":
        total_TCP = total_TCP + 1
    elif protocol == "IP":
        total_IP = total_IP + 1
    elif protocol == "PP":
        total_PP = total_PP + 1

def update_data():
    global bar_chart1, alerts_table2,  pie_chart3, bar_chart4
    global total_normal, total_attacks
    global total_DOS, total_R2L, total_U2R, total_PROBE
    global total_ICMP, total_IP, total_UDP, total_PROBE
    bar_chart1 = [{
            "dataSource":[
            { "x": "ICMP", "y": total_ICMP },
            { "x": "IP", "y": total_IP },
            { "x": "UDP", "y": total_UDP },
            { "x": "Probe", "y": total_PROBE }
            ],
            "xName": "x",
            "yName": "y",
            "name": "Alerts",
            "type": "StackingColumn",
            "background": "blue"
        }]
    alerts_table2 = [
            {"AttackType": "DOS", "ProtocolType": "ICMP", "Services": service_per_attack["dos"], "Type": "Attack", "NumPacket": total_DOS},
            {"AttackType": "R2L","ProtocolType": 'IP', "Services": service_per_attack['r2l'], "Type": "Attack","NumPacket": total_R2L},
            {"AttackType": "U2R", "ProtocolType": 'UDP',"Services": service_per_attack['u2r'], "Type": "Attack", "NumPacket": total_U2R},
            {"AttackType": "Probe", "ProtocolType": 'UDP', "Services": service_per_attack['probe'], "Type": "Attack", "NumPacket": total_PROBE}
        ]
    pie_chart3 = [
        {"x": "Attack","y": total_attacks},
        {"x": "Normal","y": total_normal}
        ]
    bar_chart4 = [
            { "protocol": 'UDP', "packets": total_UDP},
            { "protocol": 'TCP',  "packets": total_TCP},
            { "protocol": 'ICMP', "packets": total_ICMP},
            { "protocol": 'IP', "packets": total_IP},
            { "protocol": 'PP', "packets": total_PP},
        ]

class SnifferAgent(Agent):
    class SnifferBehaviour(CyclicBehaviour):
        async def on_start(self):
            # Open the CSV file and extract the reader
            self.file = open("./data.csv", "r")
            self.file_reader = csv.reader(self.file)

        async def run(self):
            global sniffed_packets
            # Read the next line from the CSV file
            line = next(self.file_reader)
            
            # Check if the end of the file has been reached
            if line is None:
                self.file.close()
                await self.agent.stop()
            else:
                sniffed_packets.append(line)

    async def setup(self):
        print("/******************Sniffer started******************/")
        b = self.SnifferBehaviour()
        self.add_behaviour(b)

class EncoderAgent(Agent):
    class EncoderBehaviour(CyclicBehaviour):
        async def on_start(self):
            self.standard_scaler = StandardScaler()
            self.label_encoder = LabelEncoder()
        async def run(self):
            global encoded_packets, sniffed_packets
            for sniffed_packet in sniffed_packets:
                # Start encoding 
                #sc_packet = self.standard_scaler.fit_transform(sniffed_packet.select_dtypes(include=['float64','int64']))
                # turn the result back to a dataframe
                #sc_packetdf = pd.DataFrame(sc_packet)
                # extract categorical attributes from both training and packet sets 
                #catpacket = sniffed_packet.select_dtypes(include=['object']).copy()

                # encode the categorical attributes
                #packetcat = catpacket.apply(self.label_encoder.fit_transform)

                #packet_df = pd.concat([sc_packetdf,packetcat],axis=1)
                encoded_packets.append(sniffed_packet)
            

    async def setup(self):
        print("/******************Encoder started******************/")
        b = self.EncoderBehaviour()
        self.add_behaviour(b)

class ClassifierAgent(Agent):
    class ClassifierBehaviour(CyclicBehaviour):
        async def on_start(self):
            # Load the pickled model
            path = os.path.join(sys.path[0])
            self.pickled_model = pickle.load(open(path + './model.pkl', 'rb'))
        async def run(self):
            global encoded_packets, classified_packets
            for encoded_packet in encoded_packets:
                x = np.array([encoded_packet])
                #pred_dt = self.pickled_model.predict(x)
                #classified_packets.append(pred_dt[0])
            

    async def setup(self):
        print("/******************Classifier started******************/")
        # Add a behaviour to receive and process incoming messages
        b = self.ClassifierBehaviour()
        self.add_behaviour(b)

class AnalyzerAgent(Agent):
    class AnalyzerBehaviour(CyclicBehaviour): 
        async def on_start(self):
            self.df = pd.read_csv('attack-evaluation.csv')
            self.i = 0
        async def run(self):
            global classified_packets
            global total_attacks, total_normal

            while(self.i < len(self.df)):
                type = self.df.loc[self.i, "Type"]
                if type == 'normal':
                    # increment normal
                    total_normal = total_normal + 1
                elif type != 'Type':
                    # increment attacks
                    total_attacks = total_attacks + 1
                    # update
                    update_attack(type)
                    update_data()
                
                self.i=self.i+1


    async def setup(self):
        print("/******************Analyzer started******************/")
        b = self.AnalyzerBehaviour()
        self.add_behaviour(b)
