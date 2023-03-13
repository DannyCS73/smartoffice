import React from "react";
import { BiUpArrowCircle } from "react-icons/bi";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {FaUser, FaInfoCircle, FaWallet} from "react-icons/fa";
import {Line} from "react-chartjs-2"
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip
} from 'chart.js'
import { Typography } from "@mui/material";

ChartJs.register(
    Title,
    Tooltip,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
)



function BlocksMinedGraph(){

    const labels = ["Jan", "Feb", "March", "April", "May", "June", "Jul", "Aug"];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Blocks Mined',
        data: [1, 6, 5, 7, 2, 5, 5],
        fill: false,
        borderColor: "black",
        tension: 0.3
      }]
    };

    const options = {
        interaction: {
            mode: 'index',
            intersect: false,
          },
        scales:{
            x: {
                grid: {
                    display: false
                }
            },
            y : {
                min: 0,
                max: 15,
                ticks: {
                    stepSize: 5
                }
            }
        },
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        }
    }



    return (
        <div>
            <Card className="widget-graph" sx={{ minWidth: 275 }} >
                <Typography variant="h5" className="graph-title">Blocks Mined</Typography>
                <Line data={data} options={options}></Line>
                <div style={{"margin":"auto", "textAlign":"center"}}>
                </div>
            </Card>
        </div>
    )
}

export default BlocksMinedGraph;