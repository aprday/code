var testData = [
    [5, 1],
    [1, 2, 3, 4, 5],
    [2, 1],
    [3, 2],
    [4, 2],
    [5, 3]
];

var Alice = {
    room: {
        edges: []
    },
    graph: [],
    buildGraph: function (points) {
        var self = this;
        for (var i = 0; i < points.length; i++) {
            var point = points[i];
            if (!self.graph[point]) {
                self.graph[point] = [];
            }
        }
    },

    buildEdges: function (edge) {
        var self = this;
        var point1 = edge[0];
        var point2 = edge[1];
        self.graph[point1].push(point2);
        self.graph[point2].push(point1);
    },

    combines: [],

    getCombine: function (points, length, target) {
        var self = this;
        var temp = [points[length - 1]];
        console.log(length);
        for (var i = 0; i < target; i++) {
            for (var j = 0; j < length; j++) {
                var result = self.getCombine(points, length - 1, target - 1);
                console.log(result);
                self.combines.push(temp.concat(result));
            }
        }
    }
};


function aliceTell(data) {
    var GraphAndRouters = data[0];
    var line = GraphAndRouters[0] - 1;
    var points = data[1];
    Alice.buildGraph(points);
    for (var i = 0; i < line; i++) {
        var edge = data[i + 2];
        Alice.buildEdges(edge);
    }

    // console.log(Alice.graph);

    Alice.getCombine(points, points.length, 1);

    console.log(Alice.combines);
}

aliceTell(testData);
