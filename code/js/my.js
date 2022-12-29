const height = 600;
const width = 800;

const svg = d3.select('#my_svg')
  .attr('width', width)
  .attr('height', height);

// 添加一个背景矩形以显示svg覆盖的范围
svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'none')
  .attr('stroke', 'grey');

const graph_g = svg.append('g')
  .attr('id', 'graph_g');

//d3读取tag_count_top20.csv文件
d3.csv()