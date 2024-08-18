import { getBackgroundColorProgress } from "../utils/ProgressFeature";

interface ProgressBarProps {
    label: string;
    progress: number;
}

export default function ProgressBar({ label, progress }: ProgressBarProps) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-600">{label}</label>
        <div className="w-full bg-gray-200 rounded-full h-5 mt-1">
          <div
            className={`h-5 rounded-full ${getBackgroundColorProgress(progress)}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="block text-right text-sm text-gray-600 mt-1">{progress}%</span>
      </div>
    );
  }
  