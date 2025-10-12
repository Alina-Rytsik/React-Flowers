import React from 'react';
import Card from '../components/Card/Card';

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
    <div className='content'>
      <div className='search-blok'>
        <img src='img/search.png' alt='Search' />
        <input
          onChange={onChangeSearchInput}
          onFocus={() => setIsDropdownOpen(true)} // Теперь работает, так как setIsDropdownOpen передан
          onBlur={onBlurInput}
          value={searchValue}
          placeholder='Поиск ...'
        />
        {searchValue && (
          <img
            onClick={() => onChangeSearchInput({ target: { value: '' } })} // Сброс через prop (работает)
            className='clear'
            src='/img/closeCard.png'
            alt='Clear'
          />
        )}
        {isDropdownOpen && suggestions.length > 0 && (
          <ul className='dropdown-menu'>
            {suggestions.map((title, index) => (
              <li key={index} onMouseDown={() => onSelectSuggestion(title)}>
                {title}
              </li>
            ))}
          </ul>
        )}
      </div>

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
  );
}

export default Catalog;
