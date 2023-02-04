from sklearn.preprocessing import StandardScaler ,LabelEncoder

scaler = StandardScaler()
encoder = LabelEncoder()

# extract numerical attributes and scale it to have zero mean and unit variance  
cols = test.select_dtypes(include=['float64','int64']).columns
sc_test = scaler.fit_transform(test.select_dtypes(include=['float64','int64']))

# turn the result back to a dataframe
sc_testdf = pd.DataFrame(sc_test, columns = cols)


# extract categorical attributes from both training and test sets 
cattest = test.select_dtypes(include=['object']).copy()

# encode the categorical attributes
testcat = cattest.apply(encoder.fit_transform)

test_df = pd.concat([sc_testdf,testcat],axis=1)
test_df.shape