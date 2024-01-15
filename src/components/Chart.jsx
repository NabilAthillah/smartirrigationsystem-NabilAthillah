'use client'
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend);

function Chart({ datas }) {
    const data = {
        labels: Array.isArray(datas) ? datas.slice(0, 8).map(data => data.id) : [],
        datasets: [
            {
                label: 'Kelembaban Tanah',
                data: Array.isArray(datas) ? datas.slice(0, 8).map(data => data.moist) : [],
                backgroundColor: '#E88751',
                borderColor: '#E88751',
            },
            {
                label: 'Suhu Udara',
                data: Array.isArray(datas) ? datas.slice(0, 8).map(data => data.temperature) : [],
                backgroundColor: '#769CFF',
                borderColor: '#769CFF',
            },
            {
                label: 'Kelembaban Udara',
                data: Array.isArray(datas) ? datas.slice(0, 8).map(data => data.humidity) : [],
                backgroundColor: '#FFC046',
                borderColor: '#FFC046',
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Line Diagram',
            },
            legend: {
                position: 'top',
                labels: {
                    usePointStyle: false,
                    color: '#ffffff',
                },
            },
        },
        scales: {
            y: {
                display: false,
                min: -30,
                max: 100
            },
            x: {
                display: false
            }
        }
    };

    return (
        <Line
            data={data}
            options={options}
            className="h-full"
        />
    );
}

export default Chart