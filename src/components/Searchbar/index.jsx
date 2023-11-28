import { useState } from "react"
import css from "./index.module.css"
export const SearchBar = ({onSubmit}) => {
const [search, setSearch] = useState('')
  // state = {
  //   search: ''
  // }

  const handleChange = evt => {
    setSearch(evt.currentTarget.value.toLowerCase())
  // this.setState({search: evt.currentTarget.value.toLowerCase()})
  }
  const handleSubmit = evt => {
    evt.preventDefault()
    if (search.trim() === "") {
      alert('Please fill out the search form')
      return
    }
    onSubmit(search)
    setSearch('')
    // this.setState({search: ''})
  }
  


 
      return (
        <header className={css.searchbar}>
  <form onSubmit={handleSubmit} className="form">
    <button type="submit" className="button">
      <span className="button-label">Search</span>
                </button>
                

    <input
      className="input"
              type="text"    
              onChange={handleChange}
              value={search}
      placeholder="Search images and photos"
    />
  </form>
</header>
)
    
    
}