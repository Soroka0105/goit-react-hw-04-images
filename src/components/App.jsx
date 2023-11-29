import { useState, useEffect } from "react";
import { SearchBar } from "./Searchbar";
import { ImageGallery } from "./ImageGallery";
import { Loader } from "components/Loader"
import { LoadMoreButton } from "components/Button"
import { getPhotos } from './../api/photos';
import { Modal } from "./Modal";

export const App = () =>  {
const [pictures, setPictures] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)
const [query, setQuery] = useState('')
const [page, setPage] = useState(1)
const [total, setTotal] = useState(0)
const [isShowModal, setIsShowModal] = useState(false)
const [LargeImg, setLargeImg] = useState('')
  // state = {
  //   pictures: [],
  //   isLoading: false,
  //   error: null,
  //   query: '',
  //   page: 1,
  //   total: 0,
  //   isShowModal: false,
  //   largeImg: ""
  // }
  
  const handleSearchSubmit = search => {
    setQuery(search)
    setPictures([])
    setIsLoading(false)
    setError(null)
    setPage(1)
    setTotal(0)
    setIsShowModal(false)
    setLargeImg('')
    // this.setState({
    //   query: search,
    //   pictures: [],
    // isLoading: false,
    // error: null,
    // page: 1,
    // total: 0,
    // isShowModal: false,
    // largeImg: ""  })
   
  }
     const handleClick = () => {
      setPage(page +1)
       
        // this.setState(
        //     (prevState) => {
        //         return {
        //             page: prevState.page + 1,
                    
        //         }
        //     }
            
        // )
    }
const handleOpen = (evt) => {
  setLargeImg(evt.target.alt)
  setIsShowModal(true)
  // this.setState({
  //     largeImg:evt.target.alt,
  //     isShowModal: true,
      
  //   })
  // console.log(evt.target)
  }
  const handleClose = () => {
    setIsShowModal(false)
		// this.setState({
		// 	isShowModal: false,
		// })
	}
  
  


useEffect(() => {
  
  const data = getPhotos({query,page})
  
  if(query) {
    setIsLoading(true)
    data
    .then(
      pictures =>{setPictures(prevPictures => [...prevPictures, ...pictures.hits]);
    setTotal(prevTotal => prevTotal = pictures.total)})
    .catch(error => setError(error))
    .finally(setIsLoading(false))
    }

}, [query, page])
console.log(total);
console.log(pictures.length);
  
  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.query !== this.state.query || prevState.page !== this.state.page) {


  //     this.setState({ isLoading: true, });
     
  //     getPhotos(this.state)
  //       .then(pictures => this.setState(({ pictures: [...this.state.pictures, ...pictures.hits], total: pictures.total })
  //       ))
  //       .catch(error => this.setState({ error }))
  //       .finally(() => this.setState({ isLoading: false }))
  //   }
  //   console.log(this.state)

  // }
 

  
    // const { isLoading, pictures, error, query, total, isShowModal, largeImg } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'block',
          fontSize: 40,
          color: '#010101'
        }}
      >
        <SearchBar onSubmit={handleSearchSubmit} />
         {error && <h1>{error.message}</h1>}
        {!query && <div>Please fill out the search form</div>}
        {isLoading && <Loader />}
         {pictures && <ImageGallery array={pictures} onClick={handleOpen} />} 
        {total > pictures.length && <LoadMoreButton onClick={handleClick} />}
        {isShowModal && <Modal children={LargeImg} close={ handleClose} />}
      </div>)
  
}