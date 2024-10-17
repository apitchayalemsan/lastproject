import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const formatDate = (date) => {
//     // Format date to YYYY-MM-DD
//     const [year, month, day] = date.split('-');
//     return `${year}-${month}-${day}`;
// };

const formatDate = (date) => {
    // Date is assumed to be in the format 'YYYY-MM-DDTHH:MM:SSZ' or similar
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const PriceChart = ({ data }) => {
    const chartData = {
        labels: data.map(entry => formatDate(entry.date)), // Format date to YYYY-MM-DD
        datasets: [
            {
                label: 'ราคา',
                data: data.map(entry => entry.price),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => `ราคา: ${tooltipItem.raw} บาท`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'วันที่',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'ราคา (บาท)',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default PriceChart;
