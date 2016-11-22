// On lance le serveur node à tester
var server = require('../server.js');

var request = require('supertest');

var request = request('http://localhost:10000');

describe('Test backend API ' , function () {

    describe('Test Write message then delete it ', function(){

        it('return 200 when i write a new valid message', function(done) {

            // on test que le serveur retourne bien une 200 lorsque on écrit un message valide
            // EXAMPLE
            request
                .post('/WRITE/20')
                .send({
                    message : JSON.stringify({
                        date: Math.round((new Date()).getTime() / 1000),
                        type_fiche: 'test',
                        id_fiche: 123
                    })
                })
                .expect(200)
                .end(done);
        });
    });
});