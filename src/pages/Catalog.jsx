import React from 'react';
import Card from '../components/Card/Card';
import Search from '../components/Search';
import Call from '../components/Call/index.js';

function Catalog({
  filteredItems,
  searchValue,
  isDropdownOpen,
  suggestions,
  onChangeSearchInput,
  onSelectSuggestion,
  onBlurInput,
  onAddToCart,
  setIsDropdownOpen, 
  cartItems,
  loading
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
          setIsDropdownOpen={setIsDropdownOpen}
        />

        <div className='catalog'>
          <h2>Каталог</h2>
          <div className='lineBlock'>
            <div className='line'></div>
          </div>
          
          <div className="cards-wrapper">
            {loading 
              ? [...Array(8)].map((_, index) => <Card key={index} loading={true} />)
              : filteredItems.map((item) => (
                <Card
                  key={item.id}
                  id={item.id} 
                  title={item.title}
                  price={item.price}
                  imageUrl={item.imageUrl}
                  onFavorite={() => console.log('Добавили в закладки')}
                  onPlus={(obj) => onAddToCart(obj)}
                  cartItems={cartItems}
                  loading={false}
                />
              ))
            }
          </div>

          {filteredItems.length === 0 && !loading && (
            <div className="cartEmpty">
              <p>Ничего не найдено по запросу "{searchValue}"</p>
            </div>
          )}
        </div>
      </div>
      <Call />
    </div>
  );
}

export default Catalog;
