import React from 'react';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="container mx-auto">
      <h2 className="mb-4">Search</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        style={{ color: 'black' }}
      />
      <hr className="my-4" /> {/* Add horizontal line after Search */}
      {/* Time filter */}
      <h3 className="mb-2"></h3>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" value="" id="timeFilter1" />
        <label className="form-check-label" htmlFor="timeFilter1">
          Monday
        </label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" value="" id="timeFilter2" />
        <label className="form-check-label" htmlFor="timeFilter2">
          Tuesday
        </label>
      </div>
      <hr className="my-4" /> {/* Add horizontal line after Time filters */}
      {/* Location filter */}
      <h3 className="mb-2"></h3>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" value="" id="locationFilter1" />
        <label className="form-check-label" htmlFor="locationFilter1">
          Tag 1
        </label>
      </div>
      <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" value="" id="locationFilter2" />
        <label className="form-check-label" htmlFor="locationFilter2">
          Tag 2
        </label>
      </div>
      {/* Add more filter categories as needed */}
    </div>
  );
};

export default SearchBar;
