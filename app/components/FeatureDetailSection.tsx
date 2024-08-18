"use client";

export default function FeatureSection({ title, dev, test, deploy, usage, setDev, setTest, setDeploy, setUsage }) {
    const percentDeployDev = 33;
    const percentDeployHomol = 66;
    const percentDeployProd = 100;
    const percentLocal = 0;

    const handleInputChange = (setter) => (e) => {
        const value = Math.min(100, Math.max(0, Number(e.target.value)));
        setter(value);
    };

    const handleDeployChange = (setter) => (e) => {
        const value = e.target.value;
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

    const handleUsageChange = (setter) => (e) => {
        const value = Number(e.target.value); // Converte o valor para número
        setter(value);
    };

    return (
        <div>
            <h3 className="font-semibold text-blue-500">{title}:</h3>
            <label className="block text-rose-900">Desenvolvimento:</label>
            <input
                type="number"
                value={dev}
                onChange={handleInputChange(setDev)}
                className="border border-gray-300 rounded p-2 w-full mb-2 text-gray-900"
                max={100}
                style={{ height: '40px' }}
            />
            <label className="block text-rose-900">Teste:</label>
            <input
                type="number"
                value={test}
                onChange={handleInputChange(setTest)}
                className="border border-gray-300 rounded p-2 w-full text-gray-900"
                max={100}
                style={{ height: '40px' }}
            />
            <label className="block text-rose-900">Ambiente:</label>
            <select
                value={deploy === percentDeployProd ? 'prod' : deploy === percentDeployHomol ? 'homol' : deploy === percentDeployDev ? 'dev' : 'local'}
                onChange={handleDeployChange(setDeploy)}
                className="border border-gray-300 rounded p-2 w-full text-gray-900"
                style={{ height: '40px' }}
            >
                <option value="local">Local (0%)</option>
                <option value="dev">Desenvolvimento (33%)</option>
                <option value="homol">Homologação (66%)</option>
                <option value="prod">Produção (100%)</option>
            </select>
            <label className="block text-rose-900 mt-2">Status:</label>
            <select
                value={usage}
                onChange={handleUsageChange(setUsage)}
                className="border border-gray-300 rounded p-2 w-full text-gray-900"
                style={{ height: '40px' }}
            >
                <option value="100">Plugado</option>
                <option value="0">Não plugado</option>
            </select>
        </div>
    );
}
