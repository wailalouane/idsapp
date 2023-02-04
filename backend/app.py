from flask import Flask, Response, json
import time
from server import total_attacks, total_normal
import pandas as pd

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

app = Flask(__name__)


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


@app.route('/')
def index():
    # Open file
    df = pd.read_csv('attack-evaluation.csv')
    def get_data():
        global bar_chart1, alerts_table2,  pie_chart3, bar_chart4
        global total_attacks, total_normal
        global i
        while(i < len(df)):
            time.sleep(DELAY)
            type = df.loc[i, "Type"]
            if type == 'normal':
                # increment normal
                total_normal = total_normal + 1
            else:
                # increment attacks
                total_attacks = total_attacks + 1
                # update 
                update_attack(type)
                update_data()
            i=i+1
            yield json.dumps([bar_chart1, alerts_table2, pie_chart3, bar_chart4])
    
    return Response(get_data(), mimetype="application/json")



if __name__ == '__main__':
    app.run(debug=True)