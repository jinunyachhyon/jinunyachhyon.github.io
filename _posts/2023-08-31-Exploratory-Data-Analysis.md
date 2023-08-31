---
title: Steps to Exploratory Data Analysis
categories: [Exploratory Data Analysis, Machine Learning, Beginner]
tags: [eda, python, machine_learning]
---

# Step 1: Retrieving Data
### Read and query SQL databases
```python
# SQL Data Imports
import sqlite3 as sq3
import pandas as pd

#Initialize path to SQLite database
path = ‘data/classic_rock.db’

#Create connection SQL database
con = sq3.Connection(path)

#Write  query
query = '''SELECT * FROM rock_songs;
	 '''				  

# Execute query
data  = pd.read_sql(query, con)
```

### Read and query No-SQL databases
```python
# NoSQL Data Imports
from pymongo import MongoClient

# Create connection to MongoDB
con = MongoClient()

# Choose database (con.list_database_names() to see all databases)
db = con.database_name

# Create a cursor object using a query
cursor = db.collection_name.find(query)

# Expand cursor and construct DataFrame
df = pd.DataFrame(list(cursor))
```

### Read APIs into DataFrames
```python
# Read API Data
data_url = 'https://data.cityofnewyork.us/resource/erm2-nwe9.json'

# Read data into a DataFrame
df = pd.read_json(data_url, orient='columns')
```