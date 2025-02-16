'use client';

import React, { useState, useEffect } from 'react';
import { keyTypes, type CalculatorState, type CalculatorKey, processKey } from './logic';
import { Head, MainLayout } from './components';
import './styles.css';

const automaticTurnOffTime = 600000; // Automatically turns off after 10 minutes of inactivity

export default function Calculator() {
    const initialState: CalculatorState = {
        open: true,
        currentEntry: 0,
        nextEntry: null,
        operation: null,
        float: false,
        memory: null,
        automaticTurnOff: null,
        lastAction: null,
        lastCalculation: {},
    };

    const [state, setState] = useState<CalculatorState>(initialState);

    useEffect(() => {
        return () => {
            if (state.automaticTurnOff) {
                clearTimeout(state.automaticTurnOff);
            }
        };
    }, [state.automaticTurnOff]);

    const handleClick = (key: CalculatorKey) => {
        if (state.automaticTurnOff) {
            clearTimeout(state.automaticTurnOff);
        }
        setState(currentState => ({
            ...processKey(currentState, key),
            automaticTurnOff: setTimeout(() => {
                const turnOffKey: CalculatorKey = { type: keyTypes.MAIN, value: "off" };
                setState(currentState => processKey(currentState, turnOffKey));
            }, automaticTurnOffTime)
        }));
    };

    const { open, nextEntry, currentEntry, memory } = state;
    return (
        <div className="container mx-auto px-2 py-4">
            <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
                <h1 className="text-2xl font-bold mb-4 text-center animate-gradient">
                    Máy tính
                </h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="calculator bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
                        <Head
                            open={open}
                            nextEntry={nextEntry}
                            currentEntry={currentEntry}
                            memory={memory}
                        />
                        <MainLayout onChange={handleClick} />
                    </div>
                </div>
            </div>
        </div>
    );
} 