// Require all models
const db = require('../models/applist');



// module.exports exports this function so it can be required by another file (in this case, server.js)
// Must pass in app because it contains the Express application
module.exports = function (app) {



    /* --- ROUTES --- */



    // Route for "saving to do entry" to the database via a POST request
    app.post('/add', function (req, res) {
        // Create to do entry in the database
        db.create(req.body)
            .then(function (db) {
                // Then send the results to the client
                res.json(db);
            })
            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
    });



    // Route for "saving updates to do entry" to the database via a put request
    app.put(`/api/update/:id`, function (req, res) {
        // Find to do entry by ID
        db.findOneAndUpdate({ _id: req.params.id }, { $set: { completed: true } })
            .then(function (db) {
                // Then send the results to the client
                res.json(db);
            })
            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
    });



    // Route for "retrieving to do entry" from the database via a GET request
    app.get('/api/applist', function (req, res) {
        // Find todolistapp
        db.find({})
            .then(function (db) {
                // If to do entry is successfully found, send them back to the client
                res.json(db);
            })
            .catch(function (err) {
                // If an error occurs, send the error back to the client
                res.json(err);
            });
    });



    // Route for "deleting to do entry" to the database via a delete request
    app.delete('/delete/:id', function (req, res) {
        // Delete to do entry in the database
        db.deleteOne({ _id: req.params.id })
            // Then send the results to the client
            .then(function (db) {
                res.json(db);
            })
            .catch(function (err) {
                // If an error occurs, send it back to the client
                res.json(err);
            });
    });

};
