/**
 * Load Required Mongoose Picture Schema
 */
var Pictures = require('mongoose').model('Picture'),
    AWS = require('../../config/aws'),
    bs = require('nodestalker'),
    redis = require('../../config/redis');


var redis_client = redis();

// redis_client.del('images', function(err, reply) {
//     console.log(reply);
// });


var pictures = {

    images: {},


    /**
     * check communication with global redis variable
     */
    initRedis: function(){



        // check if images is on redis already
        // if so, so hold the images on the local pictures variable
        // and use it every time you need to query something
        redis_client.on('ready', function() {
            redis_client.exists('images', function(err, reply) {
                if (reply === 1) {
                    console.log('exists');
                    redis_client.get('images', function(err, reply) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            // console.log(JSON.parse(reply));
                            // if exists set the local images
                            pictures.images = JSON.parse(reply);
                        }
                    });

                } else {
                    console.log('doesn\'t exist');
                    // set redis database
                    initializeRedisDataBase();
                }
            });
        });

        /**
         * Initialize redis Cache form MongoLab
         */
        function initializeRedisDataBase() {
            Pictures.aggregate([
                {
                    $group:
                    {
                        _id: "$_id",
                        item: {$push: "$$ROOT"}
                    }
                }
            ]).exec(function (err, docs) {
                if (err) {
                    res.status(200).json({
                        msg: 'error query'
                    });
                }
                else {
                    console.log('query success');
                    // TODO
                    // set local images data by -_id key, and item value
                    // after that, push to redis cache
                    docs.forEach(function(entry){
                        pictures.images[entry._id] = entry.item[0];
                    });
                    // console.log(pictures.images);
                    redis_client.set('images', JSON.stringify(pictures.images), function(err, reply) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log(reply);

                            redis_client.get('images', function(err, reply) {
                                if(err) {
                                    console.log(err);
                                }
                                else {
                                    console.log(JSON.parse(reply));
                                }
                            });
                        }

                    });
                }

            });

        }

    },

    /**
     * 
     * @param req
     * @param res
     */
    getRedisImages: function(req, res) {
        res.json({
            data: pictures.images
        })
    },

    /**
     * Create a new picture route
     * @param req
     * @param res
     */
    create: function(req, res) {
        console.log('inside pictures create');

        // deletes base64 line, before decoding
        var buf = new Buffer(req.body.file.replace(/^data:image\/\w+;base64,/, ""), 'base64'); // Ta-da

        // Create a new s3 bucket service instance
        var s3 = AWS();

        s3.upload({
            Bucket: 'livnepictures',
            Key: 'pictures/'+req.body.name,
            Body: buf,
            ContentType: 'binary',
            ContentEncoding: 'utf8',
            ACL:'public-read'
        }, function (err, response) {
            if (err) { throw err; }
            else {
                s3.getObject({Bucket: 'livnepictures', Key: 'pictures/'+req.body.name}, function(err, data) {
                    if (err) console.log('error on saving ' + req.body.name); // an error occurred
                    else {
                        console.log('file located: '+ response.Location);           // successful save
                        saveAndUpdateCache(response.Location);
                    }
                });

                // client.watch('default').onSuccess(function(data) {
                //     function resJob() {
                //         client.reserve().onSuccess(function(job) {
                //             console.log('reserved', job);
                //
                //             client.deleteJob(job.id).onSuccess(function(del_msg) {
                //                 console.log('deleted', job);
                //                 console.log('message', del_msg);
                //                 resJob();
                //             });
                //         });
                //     }
                //
                //     resJob();
                // });
            }
        });

        /*
        * Save the new document on MongoLab,
        * Update the cache resource at Redis Cloud
         */
        function saveAndUpdateCache(url) {
            var data = req.body;
            var newPicture = new Pictures({ creator: data.creator, title : data.title, src: url, category: data.category });

            newPicture.save(function (err,doc) {
                if(err) {
                    console.log('error saving document\n');
                }
                else {
                    // update redis cache
                    // console.log('document saved i    n DB\n' + doc);
                    // update local images
                    pictures.images[doc._id] = doc;
                    console.log(pictures.images[doc._id]);
                    // reset redis images list
                    redis_client.set('images', JSON.stringify(pictures.images), function(err, reply) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log(reply);
                        }
                    });
                }

            });

            res.json(newPicture);
        }

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
        console.log('picture_id coming: '+ req.body.picture_id);
        var picture_id = req.body.picture_id;






        Pictures.findByIdAndRemove(picture_id, function (err, reply){
            if(err) { throw err; }
            // ...
            else {
                if(reply) {

                    // delete from local images
                    console.log('before delete:' + pictures.images[picture_id]);
                    delete pictures.images[picture_id];
                    console.log('after delete:' + pictures.images[picture_id]);

                    // update redis cache
                    redis_client.set('images', JSON.stringify(pictures.images), function(err, reply) {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log(reply);
                        }
                    });

                    //remove item from s3
                    var s3 = AWS();

                    s3.deleteObject({
                        Bucket: 'livnepictures',
                        Key: 'pictures/'+ req.body.title
                    }, function (err, response) {
                        if (err) {
                            throw err;
                        }
                        else {
                            console.log('delete message: ' + response);
                            // res.json(response);
                        }
                    });
                    return res.json('Image deleted successfully');
                }
                return res.json('No Such Image');
            }
        });









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
                    // Send a JSON representation of the ingredients
                    res.status(200).json(data);
                }
            });
    }
};

module.exports = pictures;