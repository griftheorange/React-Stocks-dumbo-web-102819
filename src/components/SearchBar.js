import React from 'react';

const SearchBar = (props) => {

  const handleSortUpdate = (evt) => {
    props.changeSorting(evt.target.value.toLowerCase())
  }

  const handleFilterUpdate = (evt) => {
    props.changeFilter(evt.target.value)
  }

  return (
    <div>

      <strong>Sort by:</strong>
      <label>
        <input type="radio" value="Alphabetically" checked={props.checked == "alphabetically"} onChange={handleSortUpdate}/>
        Alphabetically
      </label>
      <label>
        <input type="radio" value="Price" checked={props.checked == "price"} onChange={handleSortUpdate}/>
        Price
      </label>
      <br/>

      <label>
        <strong>Filter:</strong>
        <select defaultValue="placeholder" onChange={handleFilterUpdate}>
          <option disabled value="placeholder">Please Select</option>
          <option value="Tech">Tech</option>
          <option value="Sportswear">Sportswear</option>
          <option value="Finance">Finance</option>
        </select>
      </label>


    </div>
  );
}


export default SearchBar;
