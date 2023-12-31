---
title: "Data Journey: Unveiling Insights through Retrieval, Cleaning, and Exploratory Data Analysis (EDA)"
categories: [Machine Learning, Exploratory Data Analysis]
tags: [eda, python, machine_learning]
---

<p>
Embarking on a comprehensive exploration of data-driven insights involves a strategic three-step process. Step 1 involves retrieving raw data, which is followed by meticulous data cleaning in Step 2. Finally, Step 3 introduces the world of Exploratory Data Analysis (EDA), where visualization and data grouping techniques come to the forefront. This structured approach ensures a solid foundation for uncovering meaningful patterns and trends within the data landscape.
</p>

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
The code utilizes the **sqlite3** and **pandas** libraries to establish a connection to the specified SQLite database, execute an SQL query, and store the result in a Pandas DataFrame named data. *Ensure that the path to the SQLite database is accurate to successfully retrieve the desired dataset.*

Allow me to clarify this technical term -- SQL, or Structured Query Language, is a specialized programming language for managing relational databases. These databases organize information into tables, with rows representing records and columns holding specific attributes.

For further clarification, relational databases is such type of database that supports the establishment of relationships between tables. These relationships are defined using keys, such as foreign keys, which link records in one table to records in another. 

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

# Step 2: Data Cleaning: Handling Missing Values and Outliers

### Outliers
An **outlier** is an observation in data that is distant from most other observations.

Typically, these observations are aberrations and do not accurately represent the phenomenon we are trying to explain through the model.

If we do not identify and deal with outliers, they can have a significant impact on the model.

> It is important to remember that some outliers are informative and provide insights into the data.

### Policies for Missing Data
- **Remove** the data: remove the row(s) entirely.
- **Impute** the data: replace with subsitituted values. Fill in the missing data with the most common value, the average value, etc.
- **Mask** the data: create a category for missing values.

### Policies for Outliers
- **Remove** them.
- **Assign** the mean or median value.
- **Transform** the variable ( the column having outlier). Eg. Log transformation
- **Predict** that what the value should be:
    - Using 'similar' observations to predict likely values.
    - Using regression.
- **Keep them,** but focus on models that are resistant to outliers.

```python
```

# Step 3: Exploratory Data Analysis
## EDA with Visualization

1. Scatter Plot
```python
plt.plot(data.sepal_length,
        data.sepal_width,
        ls='', marker='o',
        label='sepal'
)
```

2. Histogram
```python
plt.hist(data.sepal_length, bins=25)
```

3. Pairplot
```python
sns.pairplot(data, hue='species')
```

4. Hexbin Plot
```python
sns.jointplot(x=data['sepal_length'],
              y=data['sepal_width'],
              kind='hex')
```

5. Facet Grid
```python
plot = sns.FacetGrid(data,
                    col='species',
                    margin_titles=True)
                    
plot.map(plt.hist, 'sepal_width', color='green')
```

## Grouping Data for EDA
```python
data.groupby('species').mean()
```
