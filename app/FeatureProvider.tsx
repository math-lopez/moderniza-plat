"use client";
import React, { createContext, useEffect, useState } from 'react';

// Crie o contexto
export const FeatureContext = createContext();

// Crie o provedor do contexto
export const FeatureProvider = ({ children }) => {
    const [features, setFeatures] = useState<any[]>([]);

    useEffect(() => {
        // Função para buscar os dados da API
        const fetchFeatures = async () => {
            try {
                const response = await fetch('http://localhost:3005/features'); // Substitua pela URL da sua API
                if (response.ok) {
                    const data = await response.json();
                    setFeatures(data);
                } else {
                    console.error('Erro ao buscar os dados:', response.status);
                }
            } catch (error) {
                console.error('Erro na requisição:', error);
            }
        };

        fetchFeatures();
    }, []);

    const addFeature = async (newFeature) => {
        try {
            const response = await fetch('http://localhost:3005/features', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newFeature),
            });

            if (response.ok) {
                const savedFeature = await response.json();
                console.log(savedFeature);
                setFeatures([...features, savedFeature]); // Adiciona a nova feature ao estado atual
            } else {
                console.error('Erro ao inserir o dado:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const updateFeature = async (id, feature) => {
        console.log(id, feature);

        try {
            const response = await fetch(`http://localhost:3005/features/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(feature),
            });

            if (response.ok) {
                const updatedFeatureData = await response.json();
                setFeatures(features.map((feature) => 
                    feature.id === id ? updatedFeatureData : feature
                ));
            } else {
                console.error('Erro ao atualizar o dado:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    const deleteFeature = async (id) => {
        try {
            const response = await fetch(`http://localhost:3005/features/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setFeatures(features.filter((feature) => feature.id !== id));
            } else {
                console.error('Erro ao deletar o dado:', response.status);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <FeatureContext.Provider value={{ features, setFeatures, addFeature, updateFeature, deleteFeature }}>
            {children}
        </FeatureContext.Provider>
    );
};
