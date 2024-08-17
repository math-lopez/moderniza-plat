"use client";
import React, { createContext, useState } from 'react';

export interface FrenteDesenvolvimento{
    dev: number;
    test: number;
}
// Crie o contexto
export const FeatureContext = createContext();

// Crie o provedor do contexto
export const FeatureProvider = ({ children }) => {
    const [features, setFeatures] = useState([
        {
            name: 'Feature 1',
            frontEnd: {
                dev: 90,
                test: 70,
            } ,
            backEnd: {
                dev: 56,
                test: 70,
            },
            data: {
                dev: 90,
                test: 70,
            },
            deploy: 60,
            usage: 40,
        }, {
            name: 'Feature 2',
            frontEnd: {
                dev: 50,
                test: 70,
            } ,
            backEnd: {
                dev: 19,
                test: 70,
            },
            data: {
                dev: 90,
                test: 70,
            },
            deploy: 60,
            usage: 40
        },
    ]);

    return (
        <FeatureContext.Provider value={{ features, setFeatures }}>
            {children}
        </FeatureContext.Provider>
    );
};
