import React from 'react';

interface HeadProps {
  open: boolean;
  nextEntry: number | null;
  currentEntry: number;
  memory: number | null;
}

export default function Head({ open, nextEntry, currentEntry, memory }: HeadProps) {
  return (
    <header className="head">
      <div className="text-gray-400 text-xs">CASIO</div>
      <div className="solar-power">
        <div className="solar-row">
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
          <div className="cell"></div>
        </div>
        <div className="tag-line">TWO WAY POWER</div>
      </div>
      <div className="screen">
        <div className="in">
          <span className="display-value">
            {open ? nextEntry || currentEntry : ''}
          </span>
          {!!memory && (
            <span className="memory-sign">
              M
              <div>&#x029EB;</div>
              E
            </span>
          )}
        </div>
      </div>
    </header>
  );
} 