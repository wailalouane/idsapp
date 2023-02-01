import pyshark

def live_to_pcap():
    cap = pyshark.LiveCapture(output_file="capture.pcap")
    cap.sniff(timeout=60)
