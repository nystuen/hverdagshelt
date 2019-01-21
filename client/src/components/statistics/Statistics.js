import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import {Line, Doughnut} from 'react-chartjs-2';

const pieData = {
	labels: [
		'Registrert',
		'Behandles',
		'Fullført'
	],
	datasets: [{
    label: 'Antall feilmeldinger pr. status',
		data: [100, 30, 10],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

let lineData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Antall feilmeldinger pr. måned',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};


export class Statistics extends Component {

  constructor(props){
    super(props)
    this.state={
      lineData: lineData,
      pieData: pieData
    }
  }


  render() {
    return(
      <Grid>
        <Row>
          <Col sm={12} md={6} lg={6}>
            <Line
              data={this.state.lineData}
              width={500}
    	        height={500}
    	        options={{
    		          maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Antall feilmeldinger pr. måned"
                  }
    	        }}
            />
          </Col>
          <Col sm={12} md={6} lg={6}>
            <Doughnut
              data={this.state.pieData}
              width={500}
    	        height={500}
    	        options={{
    		          maintainAspectRatio: false,
                  title: {
                    display: true,
                    text: "Antall feilmeldinger pr. status"
                  }
    	        }}
            />
          </Col>
        </Row>
      </Grid>
    )
  }

}
