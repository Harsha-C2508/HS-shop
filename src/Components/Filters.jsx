import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const Filters = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const initalParams = searchParams.getAll("cat")
    const [cat,setCat] = useState(initalParams || []);
    const initialSortParams = searchParams.get("sortBy")
    const [sortBy,setSortBy] = useState(initialSortParams || "");

    const handleChange=(e)=>{
        const option = e.target.value;
        let newCat = [...cat]

        if(cat.includes(option)){
            newCat.splice(newCat.indexOf(option),1);
        }
        else{
            newCat.push(option);
        }
        setCat(newCat)
    }

    const handleSortBy=(e)=>{
        setSortBy(e.target.value)
    }

  useEffect(()=>{
        if(cat || sortBy){
            const params = {}
            cat && (params.cat = cat);
            sortBy && (params.sortBy = sortBy);
            setSearchParams(params)
        }
  },[cat,searchParams,sortBy])
  return (
  <div> 

    <h3 style={{fontSize:"20px",fontWeight:"bold"}}>Filters</h3>
        <div>
            <input type="checkbox" value='painting' onChange={handleChange}  defaultChecked={cat.includes('painting')}/>
            <label style={{marginLeft:"10px"}}>Painting</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='T-shirt' onChange={handleChange} defaultChecked={cat.includes('T-shirt')}/>
            <label style={{marginLeft:"10px"}}>T-Shirt</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value=' Shorts' onChange={handleChange} defaultChecked={cat.includes(' Shorts')}/>
            <label style={{marginLeft:"10px"}}>Shorts</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='Jeans' onChange={handleChange} defaultChecked={cat.includes('Jeans')}/>
            <label style={{marginLeft:"10px"}}>Jeans</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='Sports Shorts' onChange={handleChange} defaultChecked={cat.includes('Sports Shorts')}/>
            <label style={{marginLeft:"10px"}}>Sports Shorts</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='Shirt' onChange={handleChange} defaultChecked={cat.includes('Shirt')}/>
            <label style={{marginLeft:"10px"}}>Shirt</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='Top' onChange={handleChange} defaultChecked={cat.includes('Top')}/>
            <label style={{marginLeft:"10px"}}>Top</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='Joggers' onChange={handleChange} defaultChecked={cat.includes('Joggers')}/>
            <label style={{marginLeft:"10px"}}>Joggers</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='Palazzo Pants' onChange={handleChange} defaultChecked={cat.includes('Palazzo Pants')}/>
            <label style={{marginLeft:"10px"}}>Palazzo Pants</label>
        </div>
        <br />
        <div>
            <input type="checkbox" value='Skirts' onChange={handleChange} defaultChecked={cat.includes('Skirts')}/>
            <label style={{marginLeft:"10px"}}>Skirts</label>
        </div> 
        <br />
        <div>
            <input type="checkbox" value='Sweaters' onChange={handleChange} defaultChecked={cat.includes('Sweaters')}/>
            <label style={{marginLeft:"10px"}}>Sweaters</label>
        </div>  

        <br />
        <h3 style={{fontSize:"20px",fontWeight:"bold"}}>Sort</h3>
    <div onChange={handleSortBy}>
        <div>
            <input type="radio" value='asc' name='sortBy' defaultChecked={sortBy === 'asc'}/>
            <label style={{marginLeft:"10px"}}>Low to High</label>
        </div>
<br />
        <div>
            <input type="radio" value='desc' name='sortBy' defaultChecked={sortBy === 'desc'}/>
            <label style={{marginLeft:"10px"}}>High to Low</label>
        </div>
    </div>
</div>
  )
}

export default Filters