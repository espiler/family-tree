var nancy = new FamilyTree('Nancy').addChildren('Adam','Jill','Carl');
nancy.getPerson('Carl').addChildren('Catherine','Joseph');
nancy.getPerson('Jill').addChild('Kevin').addChildren('Samuel','George','James','Aaron');
nancy.getPerson('James').addChild('Mary');
nancy.getPerson('George').addChildren('Patrick', 'Robert');

$(document).ready(function() {

  var width = 550, height = 500;
  var cluser, diagonal, svg, root, links, link, node;

  updateGraph();

  function updateGraph() {
    cluster = d3.layout.cluster()
      .size([height, width - 160]);

    diagonal = d3.svg.diagonal()
      .projection(function (d) {
      return [d.y, d.x];
    });
      
    svg = d3.select('#tree').append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(40,0)");

    root = clone(nancy, true);
    nodes = cluster.nodes(root);
    nodes.forEach(function(d) { 
      d.y = d.depth * 80;
      d.children = d.children || []; 
    });
    links = cluster.links(nodes);

    link = svg.selectAll(".link")
      .data(links)
      .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

    node = svg.selectAll(".node")
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
  };

  $('#addChild').on('click', function() {
    var childName = $('#newChild').val();
    var parentName = $('#newParent').val();
    if (childName && parentName) { 
      nancy.getPerson(parentName).addChild(childName);
      $('#tree').html('');
      updateGraph();
      populateNames();
      resetFields();
    }
  });
})