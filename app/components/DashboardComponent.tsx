import { useContext } from 'react';
import FeatureCard from './FeatureCardComponent';
import { FeatureContext } from '../FeatureProvider';

interface DashboardProps {
  features: Array<any>; // Replace 'any' with the appropriate type for 'features'
}

export default function Dashboard() {
  const { features, setFeatures} = useContext(FeatureContext);
  const handleUpdateFeature = (updatedFeature) => {
    const updatedFeatures = features.map((feature) =>
      feature.name === updatedFeature.name ? updatedFeature : feature
    );
    setFeatures(updatedFeatures);
  };

  return (
    <div className="flex flex-wrap justify-center">
      {features.map((feature, index) => (
        <FeatureCard key={index} feature={feature} onUpdate={handleUpdateFeature} />
      ))}
    </div>
  );
}