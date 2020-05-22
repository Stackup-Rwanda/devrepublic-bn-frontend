import React from 'react';
import '../../scss/requestTable.scss';
import searchIcon from '../../assets/search-icon.png';
import addIcon from '../../assets/add-icon.png';

const NewAndSearch = () => (
  <div>
    <img className="icon" src={searchIcon} alt="search icon" />
    <img className="icon add-icon" src={addIcon} alt="add icon" />
  </div>
);

export default NewAndSearch;
