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
      .attr("transform", "translate(80, 550)")
      .call(xAxis);

    //根据graph中数据发生的时间，绘制bar
    const bar_g = svg.append('g')
      .attr('id', 'bar_g')
      .attr("transform", "translate(80, 50)");

    //统计每个bar中不同tag的数量，并且用不同的颜色表示
    const tagData = [];
    for (let i = 0; i < 55; i++) {
      tagData.push({ unrelated: 0, advertisement: 0, chatter: 0, report: 0, others: 0 });
    }
    graph.forEach((d) => {
      const time = new Date(2019, 1, 1, d.time.split(':')[0], d.time.split(':')[1], d.time.split(':')[2]);
      const minute = time.getMinutes();
      const hour = time.getHours();
      const index = (hour - 17) * 12 + Math.floor(minute / 5);
      tagData[index][d.tag]++;
    });
    //tagScale为tagData的和
    const tagScale = d3.scaleLinear()
      .domain([0, d3.max(tagData, (d) => d3.sum([d.unrelated, d.advertisement, d.chatter, d.report, d.others]))])
      .range([0, 500]);
    const tag = bar_g.selectAll('g')
      .data(tagData)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(${i * 13}, 0)`);
    tag.append('rect')
      .attr('x', 0)
      .attr('y', (d) => 500 - tagScale(d.unrelated))
      .attr('width', 10)
      .attr('height', (d) => tagScale(d.unrelated))
      .attr('fill', colors[0]);
    tag.append('rect')
      .attr('x', 0)
      .attr('y', (d) => 500 - tagScale(d.unrelated) - tagScale(d.advertisement))
      .attr('width', 10)
      .attr('height', (d) => tagScale(d.advertisement))
      .attr('fill', colors[1]);
    tag.append('rect')
      .attr('x', 0)
      .attr('y', (d) => 500 - tagScale(d.unrelated) - tagScale(d.advertisement) - tagScale(d.chatter))
      .attr('width', 10)
      .attr('height', (d) => tagScale(d.chatter))
      .attr('fill', colors[2]);
    tag.append('rect')
      .attr('x', 0)
      .attr('y', (d) => 500 - tagScale(d.unrelated) - tagScale(d.advertisement) - tagScale(d.chatter) - tagScale(d.report))
      .attr('width', 10)
      .attr('height', (d) => tagScale(d.report))
      .attr('fill', colors[3]);
    tag.append('rect')
      .attr('x', 0)
      .attr('y', (d) => 500 - tagScale(d.unrelated) - tagScale(d.advertisement) - tagScale(d.chatter) - tagScale(d.report) - tagScale(d.others))
      .attr('width', 10)
      .attr('height', (d) => tagScale(d.others))
      .attr('fill', colors[4]);
    //绘制纵坐标tag数量轴
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(tagData, (d) => d3.sum([d.unrelated, d.advertisement, d.chatter, d.report, d.others]))])
      .range([500, 0]);

    const yAxis = d3.axisLeft(yScale)
      .ticks(10);

    svg.append("g")
      .attr("transform", "translate(80, 50)")
      .call(yAxis);

    //为坐标轴添加图例
    const legend = svg.append('g')
      .attr('id', 'legend')
      .attr('transform', 'translate(80, 50)');

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', colors[0]);
    legend.append('text')
      .attr('x', 15)
      .attr('y', 10)
      .text('unrelated');

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', colors[1]);
    legend.append('text')
      .attr('x', 15)
      .attr('y', 30)
      .text('advertisement');

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 40)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', colors[2]);
    legend.append('text')
      .attr('x', 15)
      .attr('y', 50)
      .text('chatter');

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 60)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', colors[3]);
    legend.append('text')
      .attr('x', 15)
      .attr('y', 70)
      .text('report');

    legend.append('rect')
      .attr('x', 0)
      .attr('y', 80)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', colors[4]);
    legend.append('text')
      .attr('x', 15)
      .attr('y', 90)
      .text('others');

    //添加纵坐标标签Number of messages
    svg.append('text')
      .attr('x', 20)
      .attr('y', 300)
      .text('Number of messages')
      //旋转90度
      .attr('transform', 'rotate(-90, 20, 300)');

    //添加横坐标标签Time
    svg.append('text')
      .attr('x', 400)
      .attr('y', 590)
      .text('Time');

    //当鼠标移动到对应颜色的矩形上时，显示该时间段的tag类型及数量
    tag.on('mouseover', (d, i) => {
      const x = 34 * 15 + 80;
      const y = 50;
      const unrelated = d.unrelated;
      const advertisement = d.advertisement;
      const chatter = d.chatter;
      const report = d.report;
      const others = d.others;
      const total = unrelated + advertisement + chatter + report + others;
      //time从17点开始 加上i*5分钟
      const time = new Date(2018, 0, 1, 17, i * 5, 0);
      //time仅保留时分秒
      const timeStr = new Date(time).toTimeString().slice(0, 8);
      const tooltip = svg.append('g')
        .attr('id', 'tooltip')
        .attr('transform', `translate(${x}, ${y})`);
      //添加时间段
      tooltip.append('text')
        .attr('x', 5)
        .attr('y', -10)
        .text(`time: ${timeStr}`);
      tooltip.append('text')
        .attr('x', 5)
        .attr('y', 10)
        .text(`unrelated: ${unrelated}`);
      tooltip.append('text')
        .attr('x', 5)
        .attr('y', 30)
        .text(`advertisement: ${advertisement}`);
      tooltip.append('text')
        .attr('x', 5)
        .attr('y', 50)
        .text(`chatter: ${chatter}`);
      tooltip.append('text')
        .attr('x', 5)
        .attr('y', 70)
        .text(`report: ${report}`);
      tooltip.append('text')
        .attr('x', 5)
        .attr('y', 90)
        .text(`others: ${others}`);
      tooltip.append('text')
        .attr('x', 5)
        .attr('y', 110)
        .text(`total: ${total}`);
    });

    tag.on('mouseout', (d, i) => {
      svg.select('#tooltip').remove();
    });
  });