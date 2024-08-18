export const getBackgroundColorProgress = (progress: number) => {
    if (progress <= 10) return 'bg-red-500';
    if (progress <= 20) return 'bg-red-400';
    if (progress <= 30) return 'bg-orange-400'; 
    if (progress <= 40) return 'bg-yellow-400'; 
    if (progress <= 50) return 'bg-yellow-300'; 
    if (progress <= 60) return 'bg-yellow-200';
    if (progress <= 70) return 'bg-green-200';
    if (progress <= 80) return 'bg-green-400';
    if (progress <= 90) return 'bg-green-500';
    if (progress <= 99) return 'bg-green-600';
    return 'bg-green-900';
};
  export const getTextColorProgress = (progress: number) => {
    if (progress <= 10) return 'text-red-500';    
    if (progress <= 20) return 'text-red-400';
    if (progress <= 30) return 'text-orange-700';
    if (progress <= 60) return 'text-yellow-500';
    if (progress <= 99) return 'text-green-600';
    return 'text-green-900';
  };