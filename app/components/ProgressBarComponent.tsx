export default function ProgressBar({ label, progress }) {
  const getProgressColor = (progress) => {
    if (progress <= 10) return 'bg-red-900';
    if (progress <= 20) return 'bg-red-700';
    if (progress <= 30) return 'bg-red-500';
    if (progress <= 40) return 'bg-red-300';
    if (progress <= 50) return 'bg-yellow-300';
    if (progress <= 60) return 'bg-yellow-500';
    if (progress <= 70) return 'bg-green-300';
    if (progress <= 80) return 'bg-green-400';
    if (progress <= 90) return 'bg-green-500';
    if (progress <= 99) return 'bg-green-600';
    return 'bg-green-700';
  };
  
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600">{label}</label>
        <div className="w-full bg-gray-200 rounded-full h-5 mt-1">
          <div
            className={`h-5 rounded-full ${getProgressColor(progress)}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="block text-right text-sm text-gray-600 mt-1">{progress}%</span>
      </div>
    );
  }
  