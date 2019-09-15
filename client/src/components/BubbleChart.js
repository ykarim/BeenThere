import React            from 'react';
import ReactBubbleChart from 'react-bubble-chart';

var colorLegend = [
  //reds from dark to light
  {color: "#ffedfb", text: 'Less Similar', textColor: "#000000"}, "#ffe6f9", "#ffe0f8", {color: "#ffdbf7", text: 'More Similar', textColor: "#000000"},
];

var tooltipProps = [{
  css: 'symbol',
  prop: '_id'
}, {
  css: 'value',
  prop: 'value',
  display: 'Last Value'
}, {
  css: 'change',
  prop: 'colorValue',
  display: 'Change'
}];

class BubbleChart extends React.Component {
  render () {
    var data = this.props.data.map(d => ({
      _id: d._id,
      value: d.value,
      colorValue: d.sentiment,
      selected: d.selected
    }));

    return <ReactBubbleChart
      className="custom-chart"
      colorLegend={colorLegend}
      data={data}
      selectedColor="#737373"
      selectedTextColor="#d9d9d9"
      fixedDomain={{min: 0, max: 1}}
      legend={true}
      onClick={() => console.log("fdsfs")}
    />;
  }
}

export default BubbleChart;
