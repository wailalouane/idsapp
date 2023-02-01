from scapy.all import rdpcap 

packets= rdpcap('./simple.pcap')
for packet in packets :
    if 'TCP' in packet :
        print(packet['TCP'])