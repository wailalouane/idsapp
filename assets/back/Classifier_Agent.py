import pickle
import os ,sys
import numpy as np
from spade.agent import Agent
from spade.behaviour import CyclicBehaviour
from spade.message import Message

class ClassificationAgent(Agent):
    def setup(self):
        print(f"Classification agent {self.jid} starting")
        
        # Load the pickled model
        path = os.path.join(sys.path[0])
        self.pickled_model = pickle.load(open(path + '../model.pkl', 'rb'))

        # Add a behaviour to receive and process incoming messages
        classify_template = self.set_template("classify")
        classify_behaviour = self.ClassifyBehaviour()
        self.add_behaviour(classify_behaviour, classify_template)

    def classify(self, paquet):
        x = np.array([paquet])
        pred_dt = self.pickled_model.predict(x)
        return pred_dt[0]

    class ClassifyBehaviour(CyclicBehaviour):
        async def run(self):
            msg = await self.receive(timeout=10)
            if msg:
                # Get the data from the message
                paquet = msg.body

                # Use the classification function to make a prediction
                prediction = self.agent.classify(paquet)

                # Send the prediction back to the sender
                reply = Message(to=msg.sender)
                reply.body = prediction
                await self.send(reply)
