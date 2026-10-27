import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { dishes, categories } from "../data/dishes";
import DishCard from "../components/DishCard";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read category and search query from URL params for shareable URLs
  const currentCategory = searchParams.get("category") || "All";
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);

  // Debounce search input by 250ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);

      setSearchParams((prevParams) => {
        const nextParams = new URLSearchParams(prevParams);
        if (searchQuery.trim()) {
          nextParams.set("q", searchQuery.trim());
        } else {
          nextParams.delete("q");
        }
        return nextParams;
      }, { replace: true });
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery, setSearchParams]);

  // Handle category tab change
  const handleCategoryChange = (category) => {
    const nextParams = new URLSearchParams(searchParams);
    if (category === "All") {
      nextParams.delete("category");
    } else {
      nextParams.set("category", category);
    }
    setSearchParams(nextParams);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSearchParams({});
  };

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return dishes.filter((dish) => {
      // Category match
      const matchesCategory =
        currentCategory === "All" || dish.category === currentCategory;

      // Text query match (against name, Amharic, description, ingredients)
      const q = debouncedQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        dish.name.toLowerCase().includes(q) ||
        (dish.amharic && dish.amharic.includes(q)) ||
        dish.description.toLowerCase().includes(q) ||
        dish.ingredients.some((ing) => ing.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [currentCategory, debouncedQuery]);

  return (
    <div className="menu-page container">
      {/* Menu Header */}
      <div className="menu-header-banner">
        <div className="menu-header-text">
          <span className="section-tag">Culinary Catalog</span>
          <h1 className="menu-headline">The Addis Eats Menu</h1>
          <p className="menu-subtext">
            Prepared fresh to order using heirloom spices, traditional clay pots, and 100% pure Teff Injera.
          </p>
        </div>

        {/* Debounced Search Bar */}
        <div className="search-box-wrapper">
          <label htmlFor="dish-search" className="sr-only">
            Search dishes, spices, or ingredients
          </label>
          <div className="search-input-group">
            <span className="search-icon" aria-hidden="true">🔍</span>
            <input
              id="dish-search"
              type="search"
              className="search-input"
              placeholder="Search by dish name, berbere, teff, shiro..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search dishes, spices, or ingredients"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search input"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Navigation Tabs */}
      <div className="category-tabs-wrapper" role="tablist" aria-label="Dish Categories">
        {categories.map((cat) => {
          const isSelected = currentCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`category-tab-btn ${isSelected ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              <span className="tab-label">{cat}</span>
              {cat === "Vegan/Fasting" && <span className="tab-badge">Tsom</span>}
            </button>
          );
        })}
      </div>

      {/* Active Filter Metrics */}
      <div className="filter-status-bar">
        <p className="filter-count-text">
          Showing <strong>{filteredDishes.length}</strong> of <strong>{dishes.length}</strong> dishes
          {currentCategory !== "All" && (
            <span className="filter-pill">Category: {currentCategory}</span>
          )}
          {debouncedQuery && (
            <span className="filter-pill">Search: “{debouncedQuery}”</span>
          )}
        </p>

        {(currentCategory !== "All" || debouncedQuery) && (
          <button
            type="button"
            className="filter-reset-link"
            onClick={handleClearFilters}
          >
            Clear all filters ✕
          </button>
        )}
      </div>

      {/* Dishes Grid or Zero-Result Empty State */}
      {filteredDishes.length > 0 ? (
        <div className="dishes-grid" role="region" aria-label="Dish list">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="empty-results-card" role="status">
          <div className="empty-results-icon">🍲</div>
          <h2 className="empty-results-title">No Dishes Found</h2>
          <p className="empty-results-text">
            We couldn't find any dishes matching “<strong>{debouncedQuery || currentCategory}</strong>”.
            Try searching for our classics like <em>Doro Wat</em>, <em>Shiro</em>, or <em>Tibs</em>.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={handleClearFilters}
          >
            Reset Filters & View All
          </button>
        </div>
      )}
    </div>
  );
}

export default Menu;
