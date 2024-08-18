import { useState } from 'react';

export default function FeatureDetailsModal({ feature, closeModal, updateFeature }) {
  const percentDeployDev = 33;
  const percentDeployHomol = 66;
  const percentDeployProd = 100;
  const percentLocal = 0;
  const [frontEndDev, setFrontEndDev] = useState(feature.frontEnd.dev);
  const [frontEndTest, setFrontEndTest] = useState(feature.frontEnd.test);
  const [frontEndDeploy, setFrontEndDeploy] = useState(feature.frontEnd.deploy);
  const [backEndDev, setBackEndDev] = useState(feature.backEnd.dev);
  const [backEndTest, setBackEndTest] = useState(feature.backEnd.test);
  const [backDeploy, setBackDeploy] = useState(feature.backEnd.deploy);
  const [dataDev, setDataDev] = useState(feature.data.dev);
  const [dataTest, setDataTest] = useState(feature.data.test);
  const [dataDeploy, setDataDeploy] = useState(feature.data.deploy);
  const [usage, setUsage] = useState(feature.usage >= 100 ? 'Plugado' : 'Não plugado');

  const handleInputChange = (setter) => (e) => {
    const value = Math.min(100, Math.max(0, Number(e.target.value)));
    setter(value);
  };

  const handleDeployChange = (setter) => (e) => {
    const value = e.target.value;
    console.log(value);
    switch (value) {
      case 'dev':
        setter(percentDeployDev);
        break;
      case 'homol':
        setter(percentDeployHomol);
        break;
      case 'prod':
        setter(percentDeployProd);
        break;
      default:
        setter(percentLocal);
    }
  };


  const handleUsageChange = (e) => {
    setUsage(e.target.value);
  };

  const handleSave = () => {
    const updatedFeature = {
      ...feature,
      frontEnd: { dev: frontEndDev, test: frontEndTest, deploy: frontEndDeploy },
      backEnd: { dev: backEndDev, test: backEndTest, deploy: backDeploy },
      data: { dev: dataDev, test: dataTest, deploy: dataDeploy },
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
          {/*FrontEnd Session */}
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
            <label className="block text-rose-900">Ambiente:</label>
            <select
              value={frontEndDeploy === percentDeployProd ? 'prod' : frontEndDeploy === percentDeployHomol ? 'homol' : frontEndDeploy === percentDeployDev ? 'dev' : 'local'}
              onChange={handleDeployChange(setFrontEndDeploy)}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              style={{ height: '40px' }}
            >
              <option value="local">Local (0%)</option>
              <option value="dev">Desenvolvimento (33%)</option>
              <option value="homol">Homologação (66%)</option>
              <option value="prod">Produção (100%)</option>
            </select>
          </div>

          {/*BackEnd Session */}
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
            <label className="block text-rose-900">Ambiente:</label>
            <select
              value={backDeploy === percentDeployProd ? 'prod' : backDeploy === percentDeployHomol ? 'homol' : backDeploy === percentDeployDev ? 'dev' : 'local'}
              onChange={handleDeployChange(setBackDeploy)}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              style={{ height: '40px' }}
            >

              <option value="default">Local (0%)</option>
              <option value="dev">Desenvolvimento (33%)</option>
              <option value="homol">Homologação (66%)</option>
              <option value="prod">Produção (100%)</option>
            </select>
          </div>

          {/*Data Session */}
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
            <label className="block text-rose-900">Ambiente:</label>
            <select
              value={dataDeploy === percentDeployProd ? 'prod' : dataDeploy === percentDeployHomol ? 'homol' : dataDeploy === percentDeployDev ? 'dev' : 'local'}
              onChange={handleDeployChange(setDataDeploy)}
              className="border border-gray-300 rounded p-2 w-full text-gray-900"
              style={{ height: '40px' }}
            >
              <option value="local">Local (0%)</option>
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
