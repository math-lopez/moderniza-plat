import { useState } from 'react';

export default function FeatureDetailsModal({ feature, closeModal, updateFeature }) {
  const [frontEndDev, setFrontEndDev] = useState(feature.frontEnd.dev);
  const [frontEndTest, setFrontEndTest] = useState(feature.frontEnd.test);
  const [backEndDev, setBackEndDev] = useState(feature.backEnd.dev);
  const [backEndTest, setBackEndTest] = useState(feature.backEnd.test);
  const [dataDev, setDataDev] = useState(feature.data.dev);
  const [dataTest, setDataTest] = useState(feature.data.test);
  const [deploy, setDeploy] = useState(feature.deploy);
  const [usage, setUsage] = useState(feature.usage >= 100 ? 'Plugado' : 'Não plugado');

  const handleInputChange = (setter) => (e) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setter(value);
  };

  const handleDeployChange = (e) => {
    const value = e.target.value;
    if (value === 'dev') setDeploy(33);
    else if (value === 'homol') setDeploy(66);
    else if (value === 'prod') setDeploy(100);
  };

  const handleUsageChange = (e) => {
    setUsage(e.target.value);
  };

  const handleSave = () => {
    const updatedFeature = {
      ...feature,
      frontEnd: { dev: frontEndDev, test: frontEndTest },
      backEnd: { dev: backEndDev, test: backEndTest },
      data: { dev: dataDev, test: dataTest },
      deploy,
      usage: usage === 'Plugado' ? 100 : 0,
    };
    updateFeature(updatedFeature);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-blue-500">{feature.name} - Editar Detalhes</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-blue-500">Front-End:</h3>
            <label className="block text-rose-900">Desenvolvimento:</label>
            <input
              type="number"
              value={frontEndDev}
              onChange={handleInputChange(setFrontEndDev)}
              className="border border-gray-300 rounded p-2 w-full mb-2 text-gray-900"
              max={100}
              style={{ height: '40px' }}
            />
            <label className="block text-rose-900">Teste:</label>
            <input
              type="number"
              value={frontEndTest}
              onChange={handleInputChange(setFrontEndTest)}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              max={100}
              style={{ height: '40px' }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-blue-500">Back-End:</h3>
            <label className="block text-rose-900">Desenvolvimento:</label>
            <input
              type="number"
              value={backEndDev}
              onChange={handleInputChange(setBackEndDev)}
              className="border border-gray-300 rounded p-2 w-full mb-2 text-gray-900"
              max={100}
              style={{ height: '40px' }}
            />
            <label className="block text-rose-900">Teste:</label>
            <input
              type="number"
              value={backEndTest}
              onChange={handleInputChange(setBackEndTest)}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              max={100}
              style={{ height: '40px' }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-blue-500">Dados:</h3>
            <label className="block text-rose-900">Desenvolvimento:</label>
            <input
              type="number"
              value={dataDev}
              onChange={handleInputChange(setDataDev)}
              className="border border-gray-300 rounded p-2 w-full mb-2 text-gray-900"
              max={100}
              style={{ height: '40px' }}
            />
            <label className="block text-rose-900">Teste:</label>
            <input
              type="number"
              value={dataTest}
              onChange={handleInputChange(setDataTest)}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              max={100}
              style={{ height: '40px' }}
            />
          </div>

          <div>
            <h3 className="font-semibold text-blue-500">Deploy:</h3>
            <label className="block text-rose-900">Ambiente:</label>
            <select
              value={deploy === 100 ? 'prod' : deploy === 66 ? 'homol' : 'dev'}
              onChange={handleDeployChange}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              style={{ height: '40px' }}
            >
              <option value="dev">Desenvolvimento (33%)</option>
              <option value="homol">Homologação (66%)</option>
              <option value="prod">Produção (100%)</option>
            </select>
          </div>

          <div>
            <h3 className="font-semibold text-blue-500">Uso Efetivo:</h3>
            <label className="block text-rose-900">Status:</label>
            <select
              value={usage}
              onChange={handleUsageChange}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              style={{ height: '40px' }}
            >
              <option value="Plugado">Plugado</option>
              <option value="Não plugado">Não plugado</option>
            </select>
          </div>
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
