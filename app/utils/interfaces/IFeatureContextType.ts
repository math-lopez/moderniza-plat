import { Feature } from "./Feature";

export default interface IFeatureContextType {
  features: Feature[];
  setFeatures: React.Dispatch<React.SetStateAction<Feature[]>>;
  addFeature: (feature: Feature) => void;
  deleteFeature: (id: number) => void;
  updateFeature: (id: number, updatedFeature: Feature) => void;
}