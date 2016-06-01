var pictures = require('../controllers/pictures.controller.js');



// studentsCourses route
module.exports = function(app) {

    pictures.initRedis();

    //CRUD Operations
    app.post('/api/picture/', pictures.create);
    app.post('/api/picture/delete', pictures.delete);
    app.put('/api/picture/:id', pictures.update);


    //Other Routes
    app.post('/api/picture/picturesByCategory', pictures.getPicturesByCategory);
    app.post('/allData', pictures.allData);

    // Cached Ready Data
    app.get('/getRedisImages', pictures.getRedisImages)
};