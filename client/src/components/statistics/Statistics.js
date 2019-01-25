import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import {Line, Doughnut} from 'react-chartjs-2';
import { StatisticsService } from "../../services";
import ReactDOMServer from "react-dom/server";
import * as jsPDF  from 'jspdf'
import html2canvas from 'html2canvas';
import { PageHeader } from '../PageHeader/PageHeader';

let statisticsService = new StatisticsService();

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

const pieData2 = {
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
      label: 'Antall feilmeldinger',
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

let lineData2 = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Antall feilmeldinger',
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

var date = new Date();
let today = ("0"+ date.getDate()).slice(-2) + '.' + ("0"+ (date.getMonth()+1)).slice(-2) + '.' + date.getFullYear()

export class Statistics extends Component {

  constructor(props){
    super(props)
    this.state={
      lineData: lineData,
      pieData: pieData,
      lineDataAllCounties: lineData2,
      pieDataAllCounties: pieData2,
    }
  }

  componentWillMount() {
    statisticsService
      .getStatus(window.sessionStorage.getItem('countyId'))
      .then((res) => {
        console.log("Test one counties", res)
        let pieDummy = this.state.pieData
        pieDummy.datasets[0].data[0] = res[2].ant
        pieDummy.datasets[0].data[1] = res[1].ant
        pieDummy.datasets[0].data[2] = res[0].ant
        this.setState({
          pieData: pieDummy
        })
        console.log("enkelt-pai", this.state.pieData)
      })

    statisticsService
      .getDaily(window.sessionStorage.getItem('countyId'))
      .then((res) => {
        let lineDummy = this.state.lineData
        lineDummy.labels = []
        lineDummy.datasets[0].data = []
        console.log("one line-pies", res)
        res.map(e => {
          lineDummy.labels.push(e.date)
          lineDummy.datasets[0].data.push(e.ant)
        })
        console.log("Etter line-endring", lineData)
        this.setState({
          lineData: lineDummy
        })
      })

    statisticsService
      .getStatusAllCounties()
      .then((res) => {
        let pieDummy = this.state.pieDataAllCounties
        console.log("Test all counties", res)
        pieDummy.datasets[0].data[0] = res[2].ant
        pieDummy.datasets[0].data[1] = res[1].ant
        pieDummy.datasets[0].data[2] = res[0].ant
        this.setState({
          pieDataAllCounties: pieDummy
        })
        console.log("dobbelt-pai", this.state.pieDataAllCounties)

      })

    statisticsService
      .getDailyAllCounties()
      .then((res) => {
        let lineDummy2 = this.state.lineDataAllCounties
        lineDummy2.labels = []
        lineDummy2.datasets[0].data = []
        console.log("All line-pies", res)
        res.map(e => {
          lineDummy2.labels.push(e.date)
          lineDummy2.datasets[0].data.push(e.ant)
        })
        this.setState({
          lineDataAllCounties: lineDummy2
        })
      })


  }

  pdf2HTML(){

    let fileName = "statistikk-" +today + '.pdf'
    const input = document.getElementById('wrap-wrap');
    console.log(input)
    var divHeight =  document.getElementById('wrap-wrap').clientHeight;
    var divWidth =  document.getElementById('wrap-wrap').clientWidth;
    var ratio = divHeight / divWidth;
    const pdf = new jsPDF("p", "mm", "a4");
    var width = pdf.internal.pageSize.getWidth();
    var height = ratio*width
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        // Page 1
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save(fileName);
      });
  }


  render() {
    let styling = {
      marginTop: "25px",
      marginBottom: "25px"
    }

    console.log('pieData equals pieDataAllCounties', (this.state.pieData==this.state.pieDataAllCounties));
    console.log('lineData equals lineDataAllCounties', (this.state.lineData==this.state.lineDataAllCounties));

    return(
      <Grid className="bottomFooter">
        <PageHeader title={'Statistikk over ' + window.sessionStorage.getItem('countyName') + ' kommune'}/>
        <Row id="wrap-wrap">
          <Col sm={12} md={6} lg={6}>
            {console.log('pieData equals lineDataAllCounties', (this.state.lineData==this.state.lineDataAllCounties))}
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
          {console.log('pieData equals lineDataAllCounties', (this.state.lineData==this.state.lineDataAllCounties))}

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
        <Row>
          <Col>
            <Button style={styling} className="center-block" bsStyle="primary" onClick={() => {this.pdf2HTML()}}>Last ned som PDF</Button>
          </Col>
        </Row>

        <PageHeader title={'Statistikk over alle kommuner'}/>
        <Row id="wrap-wrap">
          <Col sm={12} md={6} lg={6}>
            {console.log('pieData equals lineDataAllCounties', (this.state.lineData==this.state.lineDataAllCounties))}

            <Line
              data={this.state.lineDataAllCounties}
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
              data={this.state.pieDataAllCounties}
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
        <Row>
          <Col>
            <Button style={styling} className="center-block" bsStyle="primary" onClick={() => {this.pdf2HTML()}}>Last ned som PDF</Button>
          </Col>
        </Row>


      </Grid>
    )
  }
}
