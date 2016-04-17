var pictures = require('../controllers/pictures.controller.js');


// studentsCourses route
module.exports = function(app) {

    //CRUD Operations
    app.post('/api/picture/', pictures.create);
    app.put('/api/picture/:id', pictures.update);
    app.delete('/api/picture/:id', pictures.delete);

    //Other Routes
    app.post('/api/picture/picturesByCategory', pictures.getPicturesByCategory);
    app.post('/allData', pictures.allData);
};