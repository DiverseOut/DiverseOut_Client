ourApp.directive('d3piechart', function() {

  var d = {};

    d.restrict = 'E';
    d.template = '<div></div>';
    d.replace = true;
    d.scope = { dataset : '=' };

    d.link = function($scope, element, attrs) {
      $scope.$watch('dataset', function() {
        //Width and height
        var w = 250;
        var h = 250;

        // Function to filter out data <= 0
        var posNum = function(element){
          return element.value > 0
        };

        var dataset = ($scope.dataset).filter(posNum);
        var outerRadius = w / 2;
        var innerRadius = 0;
        var arc = d3.svg.arc()
          .innerRadius(innerRadius)
          .outerRadius(outerRadius);

        var pie = d3.layout.pie()
          .value(function(d){return d.value;})

        //Colors accessible via ordinal scale
        var color = d3.scale.category20();

        //Clears previous content
        jQuery(element).html('');

        //Make SVG element for circle
        var svg = d3.select(jQuery(element).get(0))
          .append("svg")
          .attr("class", "pie_circle")
          .attr("width", w)
          .attr("height", h)

        //Set up data groups
        var arcs = svg.selectAll("g.arc")
          .data(pie(dataset))
          .enter()
          .append("g")
          .attr("class", "arc")
          .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        //Radial Gradient effect on pie chart
        var grads = svg.append("defs")
        .selectAll("radialGradient")
        .data(pie(dataset))
            .enter().append("radialGradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("cx", 0)
            .attr("cy", 0)
            .attr("r", "100%")
            .attr("id", function(d, i) { return "grad" + i; });
        grads.append("stop").attr("offset", "0%").style("stop-color", function(d, i) { return color(i); });
        grads.append("stop").attr("offset", "27%").style("stop-color", function(d, i) { return color(i); });
        grads.append("stop").attr("offset", "150%").style("stop-color", "rgba(0, 0, 0)");

        //Draw arc paths
        arcs.append("path")
          .attr("fill", function(d,i) {
            return "url(#grad" + i + ")"
          })
          // .attr("stroke","white")
          .attr("d", arc)

        // Tooltip
        var tooltip = d3.select('body')
          .append('div')
          .attr('class', 'tooltip');
        tooltip.append('div')
          .attr('class', 'tooltip-label');
        tooltip.append('div')
          .attr('class', 'percentage');

        arcs.on('mouseover', function(d,i) {
          tooltip.select('.tooltip-label').html("<p>"+d.data.attribute_title+"</p>")
          tooltip.select('.percentage').html("<p>"+d.data.percentage+"%</p>")
          tooltip.style('display', 'block');
        });

        arcs.on("mousemove", function(){return tooltip.style("top", (event.pageY-7)+"px").style("left",(event.pageX+7)+"px");})

        arcs.on('mouseout', function() {
          tooltip.style('display', 'none');
        });

        //Legend
          //ToDo: Legend not displaying more than five lines
        var legend = d3.select(jQuery(element).get(0))
          .append("svg")
            .attr("class", "legend")
          .selectAll("g")
            .data(dataset)
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 30 + ")"; });

        legend.append("text")
            .attr("x", 0)
            .attr("y", 12)
            .attr("text-align","center")
            .attr("dy", "0.35em")
            .text(function(d) { return d.percentage + "%" });

        legend.append("rect")
            .attr("x", 50)
            .attr("width", 25)
            .attr("height", 25)
            .style("fill", function(d,i) {
              return color(i);
            });

        legend.append("text")
            .attr("x", 80)
            .attr("y", 12)
            .attr("dy", "0.35em")
            .text(function(d) { return d.attribute_title });

      }, true);

    };

    return d;

});
