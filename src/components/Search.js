import React from 'react';

function Search({
  searchValue,
  isDropdownOpen,
  suggestions,
  onChangeSearchInput,
  onSelectSuggestion,
  onBlurInput,
  setIsDropdownOpen,
}) {
  return (
    <div className='search-blok'>
      <img src='/img/search.png' alt='Search' />
      <input
        onChange={onChangeSearchInput}
        onFocus={() => setIsDropdownOpen(true)}
        onBlur={onBlurInput}
        value={searchValue}
        placeholder='Поиск ...'
      />
      {searchValue && (
        <img
          onClick={() => onChangeSearchInput({ target: { value: '' } })}
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
  );
}

export default Search;
