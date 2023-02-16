import { useContext, useEffect, useState } from 'react';
import { LocationDataContext } from '../App';
import './styles/search.css';


function Search() 
{

    const [searchInput, setSearchInput] = useState("");
    const [filterData, setFilterData] = useState([]);


    const location = useContext(LocationDataContext);
    const locationData = location.locationData;
    const setLocationCoordinates = location.locationCoordinates;
    const setFlag = location.flag;
    


  function handleChange(e)
  {

      const input = e.target.value;
      let count = 0;
      var filter = [];
     
      setSearchInput(input);


      for(let i=0; i<locationData.length; i++)
      {
          if(count<11)
          {
              if( Object.values(locationData[i]).some((value) => value.toLowerCase().replace("ā", "a").replace("ū","u").includes(input.toLowerCase())))
              {
                  filter.push(locationData[i]);
                  count++;
              }
          }
          else{
            break;
          }
      }

      count=0;

      
      if (input === "") {
        setFilterData([]);
      } else {

        setFilterData([...filter]);
      }

  };

  function handleClick(e)
  {
    const coordinates = e.target.id.split(",")

    setFilterData([]);
    setSearchInput("");
    setLocationCoordinates([...coordinates]);
    setFlag(false);
  };

  function handleNav()
  {
    setFilterData([]);
    setSearchInput("");
    setFlag(true);
  }


  return (
    <div className="search-container">
        <header className='header-container'>
            <div onClick={handleNav}>Home</div>
        </header>
        <div className='search-box'>
            <input value={searchInput} onChange={handleChange} placeholder="Search here..."></input>
            
            {filterData.length === 0 ? null : 
            <div className='search-result-box'> 
              
              {filterData.map((data,i) => 
            
                <div key={i} className="search_result">
                    <p id={`${data.lat},${data.lng}`} onClick={handleClick} >{`${data.city}, ${data.admin_name}, ${data.country}`}</p>
                </div>
              )}
            </div>
            }
        </div>
        
        
    </div>
  );

}

export default Search;
