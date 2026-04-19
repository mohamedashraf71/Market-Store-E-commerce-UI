import React from 'react';

function Search({
  searchTerm,
  onSearchChange,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
  categories,
  sortOptions,
  translations,
  lang,
}) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder={translations.searchPlaceholder}
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.key} value={category.key}>
            {category.label[lang] || category.label.en}
          </option>
        ))}
      </select>
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label[lang] || option.label.en}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Search;
