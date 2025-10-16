import React from 'react';
import Card from '../components/Card/Card';
import Search from '../components/Search';
import Call from '../components/Call/index.js';

function Catalog({
  items,
  filteredItems,
  searchValue,
  isDropdownOpen,
  suggestions,
  onChangeSearchInput,
  onSelectSuggestion,
  onBlurInput,
  onAddToCart,
  setIsDropdownOpen, // Добавьте этот prop
}) {
  return (
    <div>
    <div className='content'>
      <Search 
        searchValue={searchValue}
        isDropdownOpen={isDropdownOpen}
        suggestions={suggestions}
        onChangeSearchInput={onChangeSearchInput}
        onSelectSuggestion={onSelectSuggestion}
        onBlurInput={onBlurInput}
        setIsDropdownOpen={setIsDropdownOpen}  // Передано в Search
      />

      <div className='catalog'>
        <h2>Каталог</h2>
        <div className='lineBlock'>
          <div className='line'></div>
        </div>
        {filteredItems.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            price={item.price}
            imageUrl={item.imageUrl}
            onFavorite={() => console.log('Добавили в закладки')}
            onPlus={onAddToCart}
          />
        ))}
        {filteredItems.length === 0 && searchValue && (
          <p>Ничего не найдено по запросу "{searchValue}"</p>
        )}
      </div>
    </div>
    <Call />
    </div>
  );
}

export default Catalog;
