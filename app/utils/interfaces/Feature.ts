export interface Feature {
    id: number;
    name: string;
    frontEnd: Front;
    backEnd: Front;
    data: Front;
}

export interface FeatureCardProps {
    feature: Feature;
    onUpdate: (updatedFeature: Feature) => void;
    onRemove: (feature: Feature) => void;
  }