var cluster = require("cluster");
var os      = require("os");

const CPUS = os.cpus();
if (cluster.isMaster)
{
    CPUS.forEach(function() {
        cluster.fork()
    });

    cluster.on("listening", function(worker) {
        console.log("Cluster %d connected", worker.process.pid);
    });

    cluster.on("disconnect", function(worker) {
        console.log("Cluster %d disconnected", worker.process.pid);
    });

    cluster.on("exit", function(worker) {
        console.log("Cluster %d is dead", worker.process.pid);
        cluster.fork();
    });
}
else
{
    // Load server
    require(__dirname + "/server");
}