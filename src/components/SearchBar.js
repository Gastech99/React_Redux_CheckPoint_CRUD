import React, { Component, useState } from 'react'
import Home from './Home';


const SearchBar = () => {
  const [filter, setFilter] = useState("");
  const searchText = (e) => {
    setFilter(e.target.value);
  }
  console.warn(filter)
  {/*let searchData = user.users.filter(item => {
    item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
  })*/}
  return (
    <div>
      <div>
        <input type="text" placeholder='Search by name...' 
          value={filter} onChange={searchText.bind(this)} />
        <br/><br/>
        <label><input type="checkbox" />Show Tasks that is done</label>
      </div>
    </div>
  )
}

export default SearchBar


