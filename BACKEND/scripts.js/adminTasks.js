const mongoose = require('mongoose');

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://ffcsmanagementteam:ffcs12345@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority';

// Connect to MongoDB Atlas using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('Connected to MongoDB Atlas');
    
    // Perform administrative tasks using the admin user
    
    // Example: Create a new database
    db.db.admin().command({ createDatabase: 'new_database' }, function(err, res) {
        if (err) {
            console.error('Error creating database:', err);
        } else {
            console.log('New database created:', res);
        }
    });

    // Example: List all databases
    db.db.admin().listDatabases(function(err, res) {
        if (err) {
            console.error('Error listing databases:', err);
        } else {
            console.log('Databases:', res.databases);
        }
    });

    // Example: Create a new database user
    db.db.admin().addUser('new_user', 'password123', { roles: ['readWrite'] }, function(err, res) {
        if (err) {
            console.error('Error creating database user:', err);
        } else {
            console.log('New user created:', res);
        }
    });

    // Example: List all database users
    db.db.admin().listUsers(function(err, res) {
        if (err) {
            console.error('Error listing database users:', err);
        } else {
            console.log('Database users:', res.users);
        }
    });

    // Disconnect from MongoDB Atlas after completing tasks
    mongoose.disconnect();
});
