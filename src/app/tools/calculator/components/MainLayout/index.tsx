import React from "react";
import { keyTypes, type CalculatorKey } from "../../logic/constants";
import keys from "./keys";
import layout from "./layout";

interface MainLayoutProps {
  onChange: (key: CalculatorKey) => void;
}

export default function MainLayout({ onChange }: MainLayoutProps) {
  const renderKey = (key: CalculatorKey, cellIndex: number) => (
    <div className={`cell ${key.extraClass || ''}`} key={cellIndex}>
      {key.label && (
        <button 
          onClick={() => onChange(key)}
          className={`
            h-14 rounded-xl font-medium text-lg transition-all duration-200 shadow-lg
            active:translate-y-0.5 active:shadow-md
            ${key.value === 'perform' 
              ? 'bg-orange-500 hover:bg-orange-600 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-gray-100'
            }
            ${key.extraClass?.includes('red') ? 'text-orange-500' : ''}
          `}
        >
          {key.label}
        </button>
      )}
    </div>
  );

  const renderCell = (cell: string | number, cellIndex: number) => {
    let key: CalculatorKey = {
      type: keyTypes.NUMBER,
      value: "",
      extraClass: ""
    };

    if (typeof cell === "number" || cell === "") {
      key.type = keyTypes.NUMBER;
      key.label = cell.toString();
      key.value = cell.toString();
    } else {
      const [type, value] = cell.split(".");
      const foundKey = keys.find(
        key => key.type === type && key.value === value
      );
      if (foundKey) {
        key = { ...foundKey };
      }
    }

    return renderKey(key, cellIndex);
  };

  return (
    <div className="grid grid-cols-5 gap-3 p-6">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          {row.map((cell, cellIndex) => renderCell(cell, cellIndex))}
        </div>
      ))}
    </div>
  );
} 