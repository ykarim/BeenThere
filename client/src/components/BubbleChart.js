import React            from 'react';
import ReactBubbleChart from 'react-bubble-chart';
import { withRouter } from 'react-router-dom';

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

  route(event) {
    console.log(event)
    this.props.history.push(`/${event.dataid}`)
  }

  render () {
    var data = this.props.data.map(d => ({
      _id: d._id,
      value: d.value,
      colorValue: d.sentiment,
      selected: d.selected,
      dataid: d.dataid
    }));

    return <ReactBubbleChart
      className="custom-chart"
      colorLegend={colorLegend}
      data={data}
      selectedColor="#737373"
      selectedTextColor="#d9d9d9"
      fixedDomain={{min: 0, max: 1}}
      legend={true}
      onClick={(event) => this.route(event)}
    />;
  }
}

export default withRouter (BubbleChart);
