'use client';

import React, { PureComponent } from 'react';
import { keyTypes, type CalculatorState, type CalculatorKey, processKey } from './logic';
import { Head, MainLayout } from './components';
import './styles.css';

export const initialState: CalculatorState = {
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

const automaticTurnOffTime = 600000; // Automatically turns off after 10 minutes of inactivity

type Props = Record<string, never>;

class Calculator extends PureComponent<Props, CalculatorState> {
    constructor(props: Props) {
        super(props);
        this.state = initialState;
    }

    handleClick = (key: CalculatorKey) => {
        const { automaticTurnOff } = this.state;
        if (automaticTurnOff) {
            clearTimeout(automaticTurnOff);
        }
        this.setState(state => ({
            ...processKey(state, key),
            automaticTurnOff: setTimeout(() => {
                const turnOffKey: CalculatorKey = { type: keyTypes.MAIN, value: "off" };
                this.setState(state => processKey(state, turnOffKey));
            }, automaticTurnOffTime)
        }));
    }

    render() {
        const { open, nextEntry, currentEntry, memory } = this.state;
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
                            <MainLayout onChange={this.handleClick} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Calculator; 