module.exports = {

    test: function(req, res)
    {
        res.status(200).send({ error: false, message: "TEST API OK" });
    },

    node_mysql: function (req, res)
    {
        res.status(200).send({ error: false, message: "API OK" });
    }
};