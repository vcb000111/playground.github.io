'use client';

import { QRCodeGenerator } from './components/QRCodeGenerator';

export default function QRCodePage() {
  return (
    <div className="container mx-auto px-2 py-4">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold mb-4 text-center animate-gradient">
          Tạo mã QR
        </h1>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700">
          <QRCodeGenerator />
        </div>
      </div>
    </div>
  );
} 