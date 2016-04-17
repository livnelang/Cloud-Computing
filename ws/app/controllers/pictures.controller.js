/**
 * Load Required Mongoose Picture Schema
 */
var Pictures = require('mongoose').model('Picture');

var pictures = {

    /**
     * Create a new picture route
     * @param req
     * @param res
     */
    create: function(req, res) {
        console.log('inside pictures create');
        // new picture from the req.body parts
        var newPicture = new Pictures(req.body);

        newPicture.save(function (err,doc) {
            if(err) {
                console.log('error saving document\n');
            }
            console.log('document saved in DB\n');
        });

        res.json(newPicture);
    },

    /**
     * Update a picture Route
     * @param req
     * @param res
     */
    update: function(req, res) {

        var updatePicture = req.body;
        var id = req.params.id;
        data[id] = updatePicture;// Spoof a DB call
        res.json(updatePicture);
    },

    /**
     * Delete a specific Picture
     * @param req - id
     * @param res
     */
    delete: function(req, res) {

        console.log('id coming: '+ req.params.id);
        var answer = { "item_deleted" : " "};
        Pictures.findById(req.params.id, function (err, doc) {
            if (err) {
                answer.item_deleted = "failed";
                res.json(answer);
            }
            doc.remove( function() {
                console.log('hey');
                answer.item_deleted = "success";
                res.json(answer);
            }); //Removes the document
        })
    },

    allData: function(req, res) {

        console.log('/allData');

        Pictures.find().exec(function (err, docs) {
            console.log('after query allData');
            if (err) {
                res.status(200).json({
                    msg: 'error query'
                });
            }
            else {
                console.log('query success');
                res.status(200).json(docs);
            }

        });
        console.log('out of allData exec');
    },

    /**
     * Get All Picture divided by their category
     * @param req
     * @param res
     */
    getPicturesByCategory: function(req, res) {
        //console.log(Picture);
        console.log('/getPicturesByCategory');
        Pictures.aggregate([
            {
                $group:
                {
                    _id: "$category",
                    items: {$push: "$$ROOT"}
                }
            }
        ])
            .exec(function (err, data) {
                if (err) {
                    console.log('error in DB query');
                    // If there was an error send the error message
                    return res.status(400).send({
                        message: (err)
                    });
                }
                else {
                    console.log('data: ' + data);
                    // Send a JSON representation of the ingredients
                    res.status(200).json(data);
                }
            });
    }
};

module.exports = pictures;