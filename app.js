var stats =[
    {
        'city': 'San Juan', 
        'zip': '00926', 
        'state': 'PR', 
        'income': '34781',
        'age': '44'
    },
    {
        'city': 'Corona', 
        'zip': '11368', 
        'state': 'NY', 
        'income': '50797',
        'age': '32'
    },
    {
        'city': 'Chicago', 
        'zip': '60629', 
        'state': 'IL', 
        'income': '42019',
        'age': '31'
    },
    {
        'city': 'El Paso', 
        'zip': '79936', 
        'state': 'TX', 
        'income': '54692',
        'age': '31'
    },
    {
        'city': 'Los Angeles', 
        'zip': '90011', 
        'state': 'CA', 
        'income': '36954',
        'age': '28'
    },
    {
        'city': 'Norwalk', 
        'zip': '90650', 
        'state': 'CA', 
        'income': '66453',
        'age': '35'
    }
]

var MongoClient = require('mongodb').MongoClient;

var dbName = "statsdb";

var collectionName = "uscensus";

var url = `mongodb://localhost:27017/${dbName}`;

MongoClient.connect(url)
.then((db) => {
    var dbo = db.db(dbName);
    /*---------------------------------------------------------------------------------*/
    // task 1
    console.log("Database created: "+ dbName );
    db.close();

    /*---------------------------------------------------------------------------------*/
    //task 2
    dbo.createCollection(collectionName)
    .then((res) => {
        console.log("[INFO] Collection Created : "+ collectionName);
        db.close();
    });

    /*---------------------------------------------------------------------------------*/
    // task 3
    dbo.collection(collectionName).insertMany(stats)
    .then((res)=> {
        console.log("US Census Stats : \n", res);
        db.close();
    });

    /*---------------------------------------------------------------------------------*/
    // task 4
    var newStats = [
        {
            'city': 'Pacoima', 
            'zip': '91331', 
            'state': 'CA', 
            'income': '60360',
            'age': '33'
        },
        {
            'city': 'Ketchikan', 
            'zip': '99950', 
            'state': 'AK', 
            'income': '00000',
            'age': '00'
        }
    ];

    newStats.forEach((stat, index) => {
        dbo.collection(collectionName).insertOne(stat)
        .then((res) => {
            console.log("Inserted a new stat");
            if (index === newStats.length -1){
                db.close();
            }
        })
    });

    /*---------------------------------------------------------------------------------*/
    // task 5
    var query = { 'city' : "Corona"};

    dbo.collection(collectionName).find(query).toArray()
    .then((result) => {
        console.log('Zip code for Corona, NY is :'+ result[0].zip);
        db.close()
    });

    /*---------------------------------------------------------------------------------*/
    // task-6
    var incomeQuery = { 'state': 'CA'};

    dbo.collection(collectionName).find(incomeQuery).toArray()
    .then((result) => {
        if(result.length > 0) {
            console.log("Income for all Cities in California");
            result.forEach((entry) => {
                console.log(`City : ${entry.city}, Income: ${entry.income}`);
            });
        } else {
            console.log("No results found for the query");
        }

        db.close();
    });

    /*---------------------------------------------------------------------------------*/
    // task 7
    var stateQuery = { 'state' : 'AK' };
    var newValues = {$set: { 'income' : "38910", 'age' : "46" }};

    dbo.collection(collectionName).updateOne(stateQuery, newValues)
    .then((result) => {
        console.log("Updated Alaska record successfully");
        db.close();
    })

    /*---------------------------------------------------------------------------------*/
    // task 8
    dbo.collection(collectionName).find().sort({ 'state' : 1}).toArray()
    .then((sortedRecordsAscending)=> {
        console.log("Census Stats by State in Ascending Order: \n", sortedRecordsAscending);
        return dbo.collection(collectionName).find().sort({'state': -1}).toArray()
    })
    .then((sortedRecordsDescending)=> {
        console.log("Census Stats by state in Descending Order: \n", sortedRecordsDescending);
        db.close();
    })
})
.catch((err) =>{
    console.log(err);
});