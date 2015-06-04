$(document).ready(function() {
  
  var nancy, kevin;
  nancy = new FamilyTree('Nancy').addChildren('Adam','Jill','Carl');
  nancy.getChild('Carl').addChildren('Catherine','Joseph');
  kevin = nancy.getChild('Jill').addChild('Kevin');
  kevin.addChildren('Samuel','George','James','Aaron');
  kevin.getChild('James').addChild('Mary');
  kevin.getChild('George').addChildren('Patrick', 'Robert');

  var root = nancy;

  var width = 550,
    height = 500;

  var cluster = d3.layout.cluster()
    .size([height, width - 160]);

  var diagonal = d3.svg.diagonal()
    .projection(function (d) {
    return [d.y, d.x];
  });

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(40,0)");

  var nodes = cluster.nodes(root);
  nodes.forEach(function(d) { d.y = d.depth * 80; });
  var links = cluster.links(nodes);

  var link = svg.selectAll(".link")
    .data(links)
    .enter().append("path")
    .attr("class", "link")
    .attr("d", diagonal);

  var node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
    return "translate(" + d.y + "," + d.x + ")";
  })

  node.append("circle")
      .attr("r", 15);

  node.append("text")
    .attr("dx", function (d) {
    return d.children ? -50 : 20;
  })
    .attr("dy", 3)
    .text(function (d) {
    return d.name;
  });

  d3.select(self.frameElement).style("height", height + "px");
})