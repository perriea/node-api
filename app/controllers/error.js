module.exports = {

    http_error: function(req, res, code)
    {
        switch (code)
        {
            case 400:
                res.status(400).send({ error: true, message: "Bad Request" });
                //console.log(colors.error('GET > ' + req.url + ' - 400 - auth:'), req.session.username);
                break;

            case 401:
                res.status(401).send({ error: true, message: "Unauthorized" });
                break;

            case 403:
                res.status(403).send({ error: true, message: "Forbidden" });
                break;

            case 404:
                res.status(404).send({ error: true, message: "Not Found" });
                break;

            case 409:
                res.status(409).send({ error: true, message: "Conflict" });
                break;

            case 500:
                res.status(500).send({ error: true, message: "Internal Server Error" });
                break;

        }
    }
};