module.exports = {

    test: function(req, res)
    {
        res.status(200).send({ error: false, message: "TEST API OK" });
    },

    testId: function(req, res)
    {
        res.status(200).send({ error: false, message: "TEST API " + req.params.num });
    },

    node_mysql: function (req, res)
    {
        res.status(200).send({ error: false, message: "API OK" });
    }
};