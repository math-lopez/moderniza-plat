"use client";
import { useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext } from 'react';
import { FeatureContext } from '../FeatureProvider';
import { Feature } from '../utils/interfaces/Feature';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const { features } = useContext(FeatureContext);
  const chartRefs = useRef([]);

  const calculateAverageProgress = (getValue: any) => {
    const totalFeatures = features.length;
    const totalProgress = features.reduce((sum: number, feature: Feature) => {
      return sum + getValue(feature);
    }, 0);
    return (totalProgress / totalFeatures).toFixed(2);
  };

  const frontEndProgress = calculateAverageProgress(
    (feature: Feature) => (feature.frontEnd.dev + feature.frontEnd.test + feature.frontEnd.deploy + feature.frontEnd.usage) / 4
  );
  const backEndProgress = calculateAverageProgress(
    (feature: Feature) => (feature.backEnd.dev + feature.backEnd.test + feature.backEnd.deploy + feature.backEnd.usage) / 4
  );
  const dataProgress = calculateAverageProgress(
    (feature: Feature) => (feature.data.dev + feature.data.test + feature.data.deploy + feature.data.usage) / 4
  );
  const usageProgress = calculateAverageProgress(
    (feature: Feature) => (feature.frontEnd.usage + feature.backEnd.usage + feature.data.usage) / 3
  );

  const createChartData = (label: string, progress: number) => ({
    labels: [label, 'Restante'],
    datasets: [
      {
        data: [progress, 100 - progress],
        backgroundColor: ['#4CAF50', '#FF6384'],
        hoverBackgroundColor: ['#45A049', '#8e1f1f'],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  });

  const charts = [
    { label: 'Uso Efetivo', progress: usageProgress },
    { label: 'Front-End', progress: frontEndProgress },
    { label: 'Back-End', progress: backEndProgress },
    { label: 'Dados', progress: dataProgress },
  ];

  const exportToPDF = async () => {
    const pdf = new jsPDF('portrait', 'mm', 'a4');
    const margin = 10;
    let yOffset = margin;

    for (let i = 0; i < charts.length; i++) {
      const chartCanvas = chartRefs.current[i];
      if (chartCanvas) {
        const canvas = await html2canvas(chartCanvas);
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 180;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yOffset + imgHeight + 20 > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage(); // Adiciona uma nova página se o gráfico não couber
          yOffset = margin; // Reseta o yOffset para o topo da nova página
        }

        pdf.text(charts[i].label, margin, yOffset - 2);
        pdf.addImage(imgData, 'PNG', margin, yOffset, imgWidth, imgHeight);

        yOffset += imgHeight + 10; // Ajuste para o texto das porcentagens
        pdf.text(`Progresso: ${charts[i].progress}%`, margin, yOffset); // Adiciona a porcentagem abaixo do gráfico

        yOffset += 20; // Espaço entre os gráficos
      }
    }

    pdf.save('dashboard_modernizacao.pdf');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200 p-5">
      <h1 className="text-4xl font-extrabold mb-5 text-blue-700">
        Dashboard de Modernização por Frente
      </h1>
      
      <div className="mb-3">
        <button
          onClick={exportToPDF}
          className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Exportar para PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {charts.map((chart, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
              {chart.label}
            </h2>
            <div ref={(el) => (chartRefs.current[index] = el)}>
              <Pie data={createChartData(chart.label, Number(chart.progress))} />
            </div>
            <p className="mt-6 text-center text-gray-600">
              Progresso de {chart.label}:{' '}
              <span className="font-bold text-blue-500">{chart.progress}%</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
