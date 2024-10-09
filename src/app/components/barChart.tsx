'use client'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

// Registrar as escalas e os componentes do gráfico
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export function BarChart() {
  const data = {
    labels: ['Produto 1', 'Produto 2', 'Produto 3', 'Produto 4'],
    datasets: [
      {
        label: 'Vendas',
        data: [30, 50, 70, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true, // Habilita o gráfico responsivo
    maintainAspectRatio: false, // Permite que o gráfico ocupe o espaço total do contêiner
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold">Produtos Mais Vendidos</h3>
      <div className="h-[20rem] w-full flex items-center justify-center">
        <Bar data={data} options={options} />
      </div>
    </div>
  )
}
