import { useState } from "react";
import FeatureSection from "./FeatureDetailSection";

export default function FeatureDetailsModal({ feature, closeModal, updateFeature }) {
  const [frontEndDev, setFrontEndDev] = useState(feature.frontEnd.dev);
  const [frontEndTest, setFrontEndTest] = useState(feature.frontEnd.test);
  const [frontEndDeploy, setFrontEndDeploy] = useState(feature.frontEnd.deploy);
  const [frontEndUsage, setFrontEndUsage] = useState(feature.frontEnd.usage);

  const [backEndDev, setBackEndDev] = useState(feature.backEnd.dev);
  const [backEndTest, setBackEndTest] = useState(feature.backEnd.test);
  const [backDeploy, setBackDeploy] = useState(feature.backEnd.deploy);
  const [backEndUsage, setBackEndUsage] = useState(feature.backEnd.usage);

  const [dataDev, setDataDev] = useState(feature.data.dev);
  const [dataTest, setDataTest] = useState(feature.data.test);
  const [dataDeploy, setDataDeploy] = useState(feature.data.deploy);
  const [dataUsage, setDataUsage] = useState(feature.data.usage);

  const handleSave = () => {
    const featureUpdate = {
      ...feature,
      frontEnd: { dev: frontEndDev, test: frontEndTest, deploy: frontEndDeploy, usage: frontEndUsage },
      backEnd: { dev: backEndDev, test: backEndTest, deploy: backDeploy, usage: backEndUsage},
      data: { dev: dataDev, test: dataTest, deploy: dataDeploy, usage: dataUsage},
    };
    updateFeature(featureUpdate);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-5xl">
        <h2 className="text-xl font-semibold mb-4 text-blue-500">{feature.name} - Editar Detalhes</h2>

        <div className="grid grid-cols-3 gap-6">
          <FeatureSection
            title="Front-End"
            dev={frontEndDev}
            test={frontEndTest}
            deploy={frontEndDeploy}
            usage={frontEndUsage}
            setDev={setFrontEndDev}
            setTest={setFrontEndTest}
            setDeploy={setFrontEndDeploy}
            setUsage={setFrontEndUsage}
          />

          <FeatureSection
            title="Back-End"
            dev={backEndDev}
            test={backEndTest}
            deploy={backDeploy}
            usage={backEndUsage}
            setDev={setBackEndDev}
            setTest={setBackEndTest}
            setDeploy={setBackDeploy}
            setUsage={setBackEndUsage}
          />

          <FeatureSection
            title="Dados"
            dev={dataDev}
            test={dataTest}
            deploy={dataDeploy}
            usage={dataUsage}
            setDev={setDataDev}
            setTest={setDataTest}
            setDeploy={setDataDeploy}
            setUsage={setDataUsage}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleSave}
          >
            Salvar
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors"
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}