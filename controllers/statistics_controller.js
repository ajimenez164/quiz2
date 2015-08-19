var models = require('../models/models.js');

//número de preguntas
//número de comentarios totales
//número medio de comentarios por pregunta
//número de preguntas sin comentarios
//número de preguntas con comentarios

exports.load = function(req, res, next) {
    var statistics = {};
    models.Quiz.count().then(function(preguntas) {
        statistics.preguntas = preguntas;
        return models.Comment.count();
    }).then(function(comentarios) {
        statistics.comentarios = comentarios;
        return mediaComentarios =  statistics.comentarios / statistics.preguntas ;
    }).then(function(mediaComentarios) {
        statistics.mediaComentarios = mediaComentarios;
        return models.Comment.aggregate('QuizId', 'count', {distinct: true});
    }).then(function(conComentarios) {
        statistics.conComentarios = conComentarios;
        return sinComentarios = statistics.preguntas - statistics.conComentarios;
    }).then(function(sinComentarios) {
        statistics.sinComentarios = sinComentarios;
        res.render('quizes/statistics.ejs', {statistics: statistics, errors: []});
    }).catch(function(error){next(error);});

};
