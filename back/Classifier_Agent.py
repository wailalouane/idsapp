import pickle
import os ,sys
import numpy as np
def Classification(paquet) :
    x=np.array([paquet])
    pred_dt= pickled_model.predict(x)
    print(pred_dt[0])


path = os.path.join(sys.path[0])
pickled_model = pickle.load(open(path+'../model.pkl', 'rb'))


#just for test
test = pd.read_csv('../test_validation.csv')
test.drop(['Unnamed: 0'], axis=1, inplace=True)


i=0
while i < len(test):
    pred=Classification(test.iloc[i])
    print(pred)
    i += 1