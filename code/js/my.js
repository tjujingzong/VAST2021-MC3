const height = 600;
const width = 800;
const svg = d3.select('#my_svg')
  .attr('width', width)
  .attr('height', height);
const tagtonum = { unrelated: 1, advertisement: 2, chatter: 3, report: 4, others: 5 }
// 添加一个背景矩形以显示svg覆盖的范围
svg.append('rect')
  .attr('width', width)
  .attr('height', height)
  .attr('fill', 'none')
  .attr('stroke', 'grey');

const graph_g = svg.append('g')
  .attr('id', 'graph_g');

const colors = d3.schemeCategory10;

d3.json("./data.json")
  .then(function (graph) {
    //绘制横坐标时间轴，从17：00开始到21:30结束，每隔30分钟一个刻度
    const xScale = d3.scaleTime()
      .domain([new Date(2019, 1, 1, 17, 0, 0), new Date(2019, 1, 1, 21, 30, 0)])
      .range([0, width - 100]);

    const xAxis = d3.axisBottom(xScale)
      .ticks(d3.timeMinute.every(30))
      .tickFormat(d3.timeFormat("%H:%M"));

    svg.append("g")
      .attr("transform", "translate(80, 500)")
      .call(xAxis);


    //绘制纵坐标，从0到5
    const yScale = d3.scaleLinear()
      .domain([0, 6])
      .range([height - 100, 0]);

    const yAxis = d3.axisLeft(yScale)
      .ticks(7)
      //纵坐标轴的数字用文字替换
      .tickFormat((d, i) => {
        if (i == 1) return "unrelated";
        if (i == 2) return "advertisement";
        if (i == 3) return "chatter";
        if (i == 4) return "report";
        if (i == 5) return "others";
      });

    svg.append("g")
      .attr("transform", "translate(80, 0)")
      .call(yAxis);

    //绘制散点图，每个点的位置由时间和tag决定
    node = graph_g.append("g")
      .attr('id', 'circles_g')
      .selectAll("circle")
      .data(graph)
      .enter()
      .append('circle')
      //按时：分秒的格式显示时间
      .attr('cx', d => xScale(new Date(2019, 1, 1, d.time.split(':')[0], d.time.split(':')[1], d.time.split(':')[2])))
      //按tag的值显示纵坐标，并增加随机数，使得散点图更加美观
      .attr('cy', d => yScale(tagtonum[d.tag] + Math.random() * 0.7 - 0.35))
      .attr('r', 3)
      .attr('fill', (d, i) => colors[tagtonum[d.tag] - 1])
      .attr('transform', 'translate(80, 0)')
      //鼠标触碰时变色且变大
      .on('mouseover', function (d, i) {
        d3.select(this)
          .attr('fill', colors[tagtonum[d.tag]])
          .attr('r', 5);
      })
      //鼠标离开时恢复原来的颜色
      .on('mouseout', function (d, i) {
        d3.select(this)
          .attr('fill', colors[tagtonum[d.tag] - 1])
          .attr('r', 3);
      });

    node.append('title')
      .text(d => d.time + " " + d.author + ":" + "\n" + d.message);

    //添加纵坐标标签Type of messages
    svg.append('text')
      .attr('x', 20)
      .attr('y', 300)
      .text('Type of messages')
      //旋转90度
      .attr('transform', 'rotate(-90, 20, 300)');

    //添加横坐标标签Time
    svg.append('text')
      .attr('x', 400)
      .attr('y', 590)
      .text('Time');

    //在17：00处添加标签Start of POKrally 用一根线连接一个椭圆和文字 文字的位置在椭圆中间
    svg.append('line')
      .attr('x1', 80)
      .attr('y1', 500)
      .attr('x2', 80)
      .attr('y2', 527)
      .attr('stroke', 'black');

    svg.append('ellipse')
      .attr('cx', 80)
      .attr('cy', 540)
      .attr('rx', 70)
      .attr('ry', 15)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg.append('text')
      .attr('x', 80)
      .attr('y', 540)
      .text('Start of POK rally')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle');

    //在18：44处添加标签Fire 用一根线连接一个椭圆和文字 文字的位置在椭圆中间
    svg.append('line')
      .attr('x1', 80 + xScale(new Date(2019, 1, 1, 18, 44, 0)))
      .attr('y1', 500)
      .attr('x2', 80 + xScale(new Date(2019, 1, 1, 18, 44, 0)))
      .attr('y2', 527)
      .attr('stroke', 'black');

    svg.append('ellipse')
      .attr('cx', 80 + xScale(new Date(2019, 1, 1, 18, 44, 0)))
      .attr('cy', 540)
      .attr('rx', 30)
      .attr('ry', 15)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg.append('text')
      .attr('x', 80 + xScale(new Date(2019, 1, 1, 18, 44, 0)))
      .attr('y', 540)
      .text('Fire')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle');

    //在19：21处添加标签Hit用一根线连接一个椭圆和文字 文字的位置在椭圆中间
    svg.append('line')
      .attr('x1', 80 + xScale(new Date(2019, 1, 1, 19, 21, 0)))
      .attr('y1', 500)
      .attr('x2', 80 + xScale(new Date(2019, 1, 1, 19, 21, 0)))
      .attr('y2', 537)
      .attr('stroke', 'black');

    svg.append('ellipse')
      .attr('cx', 80 + xScale(new Date(2019, 1, 1, 19, 21, 0)))
      .attr('cy', 550)
      .attr('rx', 30)
      .attr('ry', 15)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg.append('text')
      .attr('x', 80 + xScale(new Date(2019, 1, 1, 19, 21, 0)))
      .attr('y', 550)
      .text('Hit')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle');

    //在19：40处添加标签Gunshot用一根线连接一个椭圆和文字 文字的位置在椭圆中间
    svg.append('line')
      .attr('x1', 80 + xScale(new Date(2019, 1, 1, 19, 40, 0)))
      .attr('y1', 500)
      .attr('x2', 80 + xScale(new Date(2019, 1, 1, 19, 40, 0)))
      .attr('y2', 513)
      .attr('stroke', 'black');

    svg.append('ellipse')
      .attr('cx', 80 + xScale(new Date(2019, 1, 1, 19, 40, 0)))
      .attr('cy', 525)
      .attr('rx', 40)
      .attr('ry', 13)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg.append('text')
      .attr('x', 45 + xScale(new Date(2019, 1, 1, 19, 40, 0)))
      .attr('y', 530)
      .text('Gunshot')

    //在21：15处添加标签Fire Controlled用一根线连接一个椭圆和文字 文字的位置在椭圆中间
    svg.append('line')
      .attr('x1', 80 + xScale(new Date(2019, 1, 1, 21, 15, 0)))
      .attr('y1', 500)
      .attr('x2', 80 + xScale(new Date(2019, 1, 1, 21, 15, 0)))
      .attr('y2', 518)
      .attr('stroke', 'black');

    svg.append('ellipse')
      .attr('cx', 80 + xScale(new Date(2019, 1, 1, 21, 15, 0)))
      .attr('cy', 535)
      .attr('rx', 60)
      .attr('ry', 15)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg.append('text')
      .attr('x', 80 + xScale(new Date(2019, 1, 1, 21, 15, 0)))
      .attr('y', 535)
      .text('Fire Controlled')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle');

    //在21：18处添加标签Fire Controlled用一根线连接一个椭圆和文字 文字的位置在椭圆中间
    svg.append('line')
      .attr('x1', 80 + xScale(new Date(2019, 1, 1, 21, 18, 0)))
      .attr('y1', 500)
      .attr('x2', 80 + xScale(new Date(2019, 1, 1, 21, 18, 0)))
      .attr('y2', 555)
      .attr('stroke', 'black');

    svg.append('ellipse')
      .attr('cx', 80 + xScale(new Date(2019, 1, 1, 21, 18, 0)))
      .attr('cy', 570)
      .attr('rx', 60)
      .attr('ry', 15)
      .attr('fill', 'none')
      .attr('stroke', 'black');

    svg.append('text')
      .attr('x', 80 + xScale(new Date(2019, 1, 1, 21, 18, 0)))
      .attr('y', 570)
      .text('Standoff End')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle');
  });