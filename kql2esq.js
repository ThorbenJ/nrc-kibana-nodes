
module.exports = function(RED) {

    const U = require("./utils");
    const Y = require("yaml");
    const M = require("mustache");
    M.escape = function (t) { return JSON.stringify(t) };
    const KNESQ = require("@kbn/es-query")

    function Kql2Esq(n) {
        RED.nodes.createNode(this,n);
        this.conf = n;
        var node = this;
        
        this.on('input', function(msg) {

            var kql = M.render(n.kql, msg)
            var esq = KNESQ.buildEsQuery({
                language: "kuery",
                query: kql
            })

            node.send({...msg,
                payload: esq
            })

        });
    }
    RED.nodes.registerType("kn-kql2esq", Kql2Esq);
};
