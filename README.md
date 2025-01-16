# m3-w2-d1-homework
Web-602-Spring 2025

## MongoDB Census Stats Application

This application demonstrates various MongoDB operations using Node.js. Each task showcases a specific functionality, and the results are accompanied by corresponding screenshots.

## Prerequisites

- MongoDB installed and running locally.
- Node.js installed.

## Setup Instructions

1. Clone this repository.
2. Navigate to the project directory.
3. Run `npm install` to install the required dependencies.
4. Run `node app.js` to execute the script.

## Tasks Overview

### Task 1: Create Database
- **Description:** Creates a new database named `statsdb`.
- **Code:**
  ```javascript
  console.log("Database created: " + dbName );
  ```
- **Screenshot:** ![Task 1 Output](/homework/task-1-output.png)

---

### Task 2: Create Collection
- **Description:** Creates a collection named `uscensus`.
- **Code:**
  ```javascript
  dbo.createCollection(collectionName)
  ```
- **Screenshot:** ![Task 2 Output](/homework/task-2-output.png)

---

### Task 3: Insert Initial Stats
- **Description:** Inserts multiple records into the `uscensus` collection.
- **Code:**
  ```javascript
  dbo.collection(collectionName).insertMany(stats)
  ```
- **Screenshot:** ![Task 3 Output](/homework/task-3-output.png)

---

### Task 4: Insert Additional Stats
- **Description:** Inserts additional records into the `uscensus` collection.
- **Code:**
  ```javascript
  newStats.forEach((stat, index) => {
      dbo.collection(collectionName).insertOne(stat)
  })
  ```
- **Screenshot:** ![Task 4 Output](/homework/task-4-output.png)

---

### Task 5: Query Zip Code for Corona, NY
- **Description:** Retrieves the zip code for the city `Corona` in `NY`.
- **Code:**
  ```javascript
  var query = { 'city' : "Corona"};
  dbo.collection(collectionName).find(query).toArray()
  ```
- **Screenshot:** ![Task 5 Output](/homework/task-5-output.png)

---

### Task 6: Income of Cities in California
- **Description:** Retrieves the income details for all cities in California.
- **Code:**
  ```javascript
  var incomeQuery = { 'state': 'CA'};
  dbo.collection(collectionName).find(incomeQuery).toArray()
  ```
- **Screenshot:** ![Task 6 Output](/homework/task-6-output.png)

---

### Task 7: Update Alaska Record
- **Description:** Updates the `income` and `age` fields for the state `Alaska`.
- **Code:**
  ```javascript
  var stateQuery = { 'state' : 'AK' };
  var newValues = {$set: { 'income' : "38910", 'age' : "46" }};
  dbo.collection(collectionName).updateOne(stateQuery, newValues)
  ```
- **Screenshot:** ![Task 7 Output](/homework/task-7-output.png)

---

### Task 8: Sort Records by State
- **Description:** Sorts the records by state in both ascending and descending order.
- **Code:**
  ```javascript
  dbo.collection(collectionName).find().sort({ 'state' : 1}).toArray()
  ```
  ```javascript
  dbo.collection(collectionName).find().sort({'state': -1}).toArray()
  ```
- **Screenshot:**
  - Ascending: ![Task 8 Output](/homework/task-8-output.png)

---


