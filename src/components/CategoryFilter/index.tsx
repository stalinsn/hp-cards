// src/components/CategoryFilter/CategoryFilter.tsx

import React from 'react';

interface CategoryFilterProps {
  selectedHouse: string;
  onSelectHouse: (house: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedHouse, onSelectHouse }) => {
  const houses = [
    { apiName: 'gryffindor', displayName: 'Grifinória', cssClass: 'gryffindor' },
    { apiName: 'slytherin', displayName: 'Sonserina', cssClass: 'slytherin' },
    { apiName: 'hufflepuff', displayName: 'Lufa-Lufa', cssClass: 'hufflepuff' },
    { apiName: 'ravenclaw', displayName: 'Corvinal', cssClass: 'ravenclaw' },
    { apiName: '', displayName: 'Todos', cssClass: 'no-house' }
  ];

  return (
    <div className="filter-bar">
      {houses.map((house) => (
        <button
          key={house.apiName}
          className={`filter-button ${house.cssClass} ${selectedHouse === house.apiName ? 'active' : ''}`}
          onClick={() => onSelectHouse(house.apiName)} // A função de clique deve ser passada aqui
        >
          {house.displayName}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
