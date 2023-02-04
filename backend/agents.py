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
file_to_read = "data.csv"
standard_scaler = StandardScaler()
label_encoder = LabelEncoder()

DELAY = 5

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
total_attacks = 0
total_normal = 0
total_DOS, total_R2L, total_U2R, total_PROBE = 0, 0, 0, 0
total_ICMP, total_UDP, total_TCP, total_IP, total_PP = 0, 0, 0, 0, 0

bar_chart1 = []
alerts_table2 = []
pie_chart3 = []
bar_chart4 = []

i = 0

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
            self.file = open(file_to_read, "r")
            self.file_reader = csv.reader(self.file)

        async def run(self):
            # Read the next line from the CSV file
            line = next(self.file_reader)
            
            # Check if the end of the file has been reached
            if line is None:
                self.file.close()
                await self.agent.stop()
            else:
                msg = Message(to="zazaxk2@jabber.hot-chilli.net")     # Instantiate the message
                msg.set_metadata("performative", "inform")  # Set the "inform" FIPA performative
                msg.body = str(line)              # Set the message content

                await self.send(msg)

    async def setup(self):
        print("/******************Sniffer started******************/")
        b = self.SnifferBehaviour()
        self.add_behaviour(b)

class EncoderAgent(Agent):
    class EncoderBehaviour(CyclicBehaviour):
        async def run(self):
            msg = await self.receive(timeout=TIMEOUT) # wait for a message for 10 seconds
            if msg:
                # Start encoding 
                packet = literal_eval(msg.body) 
                
                cols = packet.select_dtypes(include=['float64','int64']).columns
                sc_packet = standard_scaler.fit_transform(packet.select_dtypes(include=['float64','int64']))

                # turn the result back to a dataframe
                sc_packetdf = pd.DataFrame(sc_packet, columns = cols)


                # extract categorical attributes from both training and packet sets 
                catpacket = packet.select_dtypes(include=['object']).copy()

                # encode the categorical attributes
                packetcat = catpacket.apply(label_encoder.fit_transform)

                packet_df = pd.concat([sc_packetdf,packetcat],axis=1)
                packet_df.shape

                # Send to classifier
                reply = Message(to="zazaxk3@jabber.hot-chilli.net")
                reply.set_metadata("performative", "inform")  # Set the "inform" FIPA performative
                reply.body = packet_df

                await self.send(reply)
            else:
                print("Did not received any message after 10 seconds")
                # stop agent from behaviour
                await self.agent.stop()

    async def setup(self):
        print("/******************Encoder started******************/")
        b = self.EncoderBehaviour()
        template = Template()
        template.set_metadata("performative", "inform")
        self.add_behaviour(b, template)

class ClassifierAgent(Agent):
    class ClassifierBehaviour(CyclicBehaviour):
        async def on_start(self):
            # Load the pickled model
            path = os.path.join(sys.path[0])
            self.pickled_model = pickle.load(open(path + './model.pkl', 'rb'))
        async def run(self):
            msg = await self.receive(timeout=TIMEOUT) # wait for a message for 10 seconds
            if msg:
                # Get the data from the message
                packet = literal_eval(msg.body) 

                # start classifying 
                x = np.array([packet])
                pred_dt = self.pickled_model.predict(x)

                # Send prediction to analyzer
                reply = Message(to="zazaxk4@jabber.hot-chilli.net")
                reply.set_metadata("performative", "inform")  # Set the "inform" FIPA performative
                reply.body = pred_dt[0]

                await self.send(reply)
            else:
                print("Did not received any message after 10 seconds")
                # stop agent from behaviour
                await self.agent.stop()

    async def setup(self):
        print("/******************Classifier started******************/")
        # Add a behaviour to receive and process incoming messages
        b = self.ClassifierBehaviour()
        template = Template()
        template.set_metadata("performative", "inform")
        self.add_behaviour(b, template)

class AnalyzerAgent(Agent):
    class AnalyzerBehaviour(CyclicBehaviour): 
        async def run(self):
            global bar_chart1, alerts_table2,  pie_chart3, bar_chart4
            global total_attacks, total_normal

            msg = await self.receive(timeout=TIMEOUT) # wait for a message for 10 seconds
            if msg:
                # Start analyzing 
                packet = literal_eval(msg.body) 
                
                if packet[1] == 'normal':
                    # increment normal
                    total_normal = total_normal + 1
                else:
                    # increment attacks
                    total_attacks = total_attacks + 1
                    # update
                    update_attack(packet[1])
                    update_data()
                
            else:
                print("Did not received any message after 10 seconds")
                # stop agent from behaviour
                await self.agent.stop()

    async def setup(self):
        print("/******************Analyzer started******************/")
        b = self.AnalyzerBehaviour()
        template = Template()
        template.set_metadata("performative", "inform")
        self.add_behaviour(b, template)

if __name__ == "__main__":
    # Analyzer
    analyzer = AnalyzerAgent("zazaxk4@jabber.hot-chilli.net", "5UkBgcXsGnSMnj#")
    future_analyzer = analyzer.start()
    future_analyzer.result() # wait for receiver agent to be prepared.
    # Classifier
    classifier = ClassifierAgent("zazaxk3@jabber.hot-chilli.net", "5UkBgcXsGnSMnj#")
    future_classifier = classifier.start()
    future_classifier.result() # wait for receiver agent to be prepared.
    # Encoder
    encoder = EncoderAgent("zazaxk2@jabber.hot-chilli.net", "5UkBgcXsGnSMnj#")
    future_encoder = encoder.start()
    future_encoder.result() # wait for receiver agent to be prepared.
    # Sniffer
    sniffer = SnifferAgent("zazaxk@jabber.hot-chilli.net", "5UkBgcXsGnSMnj#")
    future_sniffer = sniffer.start()
    future_sniffer.result() # wait for receiver agent to be prepared.

    while analyzer.is_alive():
        try:
            time.sleep(1)
        except KeyboardInterrupt:
            sniffer.stop()
            encoder.stop()
            classifier.stop()
            analyzer.stop()
            break
    print("Agents finished")