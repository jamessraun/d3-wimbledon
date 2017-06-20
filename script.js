/* global d3 */

// Our canvas
const width = 750,
  height = 300,
  margin = 20
  marginLeft = 40


// Drawing area
let svg = d3.select('#results')
  .append('svg')
  .attr('width', width)
  .attr('height', height,(d) => yScale(d))

// Data reloading
let reload = () => {
  // Your data parsing here...
  d3.tsv('afcw-results.tsv', (data) => {
    redraw(data)
  })
}

// redraw function
let redraw = (data) => {
  // Your data to graph here

// format the data
 data.forEach(function(d) {
     d.GoalsScored = +d.GoalsScored;
 });

 // Scale the range of the data
 var x = d3.scaleTime().range([0, width]);
 var y = d3.scaleLinear().range([height, 0]);

 // define the line
 var valueline = d3.line()
  .x(function(d,i) { return x(i); })
  .y(function(d) { return y(d.GoalsScored); });


  const yScale = d3.scaleLinear()
  .domain([0,d3.max(data.map(d => d.GoalsScored))])
  .range([0, 300])

  const colorScale = d3.scaleLinear()
  .domain([0,d3.max(data.map(d => d.GoalsScored))])
  .range(['peru','teal'])

  svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('class','bar')
  .attr('x', (d,i) => i*25)
  .attr('y', (d) => 300-yScale(d.GoalsScored))
  .attr('width',20)
  .attr('height',(d) => yScale(d.GoalsScored))
  .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


     // Add the valueline path.
   svg.append("path")
       .data([data])
       .attr("class", "line")
       .attr("d", valueline);

   // Add the x Axis
   svg.append("g")
       .attr("transform", "translate(0," + height + ")")
       .call(d3.axisBottom(x));
       // text label for the x axis
   svg.append("text")
       .attr("transform",
             "translate(" + (width/2) + " ," +
                            (height + margin.top + 20) + ")")
       .style("text-anchor", "middle")
       .text("Matches");

     // Add the y Axis
   svg.append("g")
       .call(d3.axisLeft(y));

     // text label for the y axis
   svg.append("text")
       .attr("transform", "rotate(-90)")
       .attr("y", 0 - margin.left)
       .attr("x",0 - (height / 2))
       .attr("dy", "1em")
       .style("text-anchor", "middle")
       .text("Goals");

}

reload()
