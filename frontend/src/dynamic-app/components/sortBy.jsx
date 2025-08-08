import React, { useState, useRef, useEffect, useMemo } from 'react';
import fetchImages from '../lib/fetchUser';

import { useStyleInjection } from '../dynamic-app-style-injector.ts'; // Adjust path as needed
import sortByCss from '../../styles/dynamic-app/sortByStyles.css?raw';

const options = [
  { value: 'random', label: 'Randomized' },
  { value: 'titleAsc', label: 'A to Z' },
  { value: 'titleDesc', label: 'Z to A' },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

function SortBy({ onFetchItems, customArrowIcon, colorMapping, getRoot = () => document }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState('random');
  const [items, setItems] = useState([]);
  const dropdownRef = useRef(null);

  useStyleInjection(sortByCss, 'dynamic-app-style-sortby');

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    const root = typeof getRoot === 'function' ? getRoot() : document;
    const pauseButton = root.querySelector('.lottie-container');
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      (!pauseButton || !pauseButton.contains(e.target))
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const root = typeof getRoot === 'function' ? getRoot() : document;
    root.addEventListener('mousedown', handleClickOutside);
    return () => root.removeEventListener('mousedown', handleClickOutside);
  }, [getRoot]);

  useEffect(() => {
    const fetchData = async () => {
      let fetched = await fetchImages(selectedValue);
      if (selectedValue === 'random') {
        fetched = shuffleArray(fetched);
      }
      setItems(fetched);
      onFetchItems?.(fetched);
    };
    fetchData();
  }, [selectedValue]);

  // Responsive index logic
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const onResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const itemIndex = screenWidth >= 1025 ? 2 : screenWidth >= 768 ? 1 : 0;

  const convertHexToRGBA = (hex, alpha) => {
    const hexWithoutHash = hex.replace('#', '');
    const r = parseInt(hexWithoutHash.slice(0, 2), 16);
    const g = parseInt(hexWithoutHash.slice(2, 4), 16);
    const b = parseInt(hexWithoutHash.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const borderItemColor = useMemo(() => {
    const alt = items[itemIndex]?.alt1;
    const color = Array.isArray(colorMapping?.[alt]) ? colorMapping[alt][2] : '#ffffff';
    return convertHexToRGBA(color, 0.8);
  }, [items, colorMapping, itemIndex]);

  const boxShadowItemColor = useMemo(() => {
    const alt = items[itemIndex]?.alt1;
    return Array.isArray(colorMapping?.[alt]) ? colorMapping[alt][3] : '#ffffff';
  }, [items, colorMapping, itemIndex]);

  return (
    <div className="sort-by-container">
      <div className="sort-container"><p>Sort by:</p></div>
      <div className="sort-container2">
        <div
          className="custom-dropdown"
          ref={dropdownRef}
          style={{
            border: `solid 1.6px ${borderItemColor}`,
            boxShadow: `0 1px 8px rgba(0,0,0,0.1), 0 22px 8px rgba(0,0,0,0.08), 12px 12px ${boxShadowItemColor}`,
          }}
        >
          <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
            <div className="selected-value">
              <h5>{options.find(opt => opt.value === selectedValue)?.label}</h5>
            </div>
            <span className={`custom-arrow ${isOpen ? 'open' : ''}`}>
              {customArrowIcon && <div dangerouslySetInnerHTML={{ __html: customArrowIcon }} />}
            </span>
          </div>
          {isOpen && (
            <div className="options-container" style={{ border: `solid 1.6px ${borderItemColor}`, borderTop: 'none' }}>
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`option ${option.value === selectedValue ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SortBy;
