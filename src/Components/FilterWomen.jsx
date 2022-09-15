import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Box, Checkbox,Heading } from '@chakra-ui/react';

const FilterWomen = () => {
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
            setSearchParams({cat:cat,
            sortBy:sortBy})
        }
  },[cat,searchParams,sortBy,setSearchParams])

//    console.log(searchParams.getAll("cat"))
console.log(sortBy)
  return (
  <Box> 

    <Heading as='h3' size='lg' style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>Filters</Heading>
        <Box>
            <Checkbox type="checkbox" value='Jeans' onChange={handleChange} defaultChecked={cat.includes('Jeans')}/>
            <label style={{marginLeft:"10px"}}>Jeans</label>
        </Box>
        <br />
        <Box>
            <Checkbox type="checkbox" value='Top' onChange={handleChange} defaultChecked={cat.includes('Top')}/>
            <label style={{marginLeft:"10px"}}>Top</label>
        </Box>
        <br />
        <Box>
            <Checkbox type="checkbox" value='Palazzo Pants' onChange={handleChange} defaultChecked={cat.includes('Palazzo Pants')}/>
            <label style={{marginLeft:"10px"}}>Palazzo Pants</label>
        </Box>
        <br />
        <Box>
            <Checkbox type="checkbox" value='Skirts' onChange={handleChange} defaultChecked={cat.includes('Skirts')}/>
            <label style={{marginLeft:"10px"}}>Skirts</label>
        </Box> 
        <br />
        <Box>
            <Checkbox type="checkbox" value='Sweaters' onChange={handleChange} defaultChecked={cat.includes('Sweaters')}/>
            <label style={{marginLeft:"10px"}}>Sweaters</label>
        </Box>  

        <br />
        <Heading as='h3' size='lg' style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>Sort</Heading>
    <Box onChange={handleSortBy}>
        <Box>
            <input type="radio" value='asc' name='sortBy' defaultChecked={sortBy === 'asc'}/>
            <label style={{marginLeft:"10px"}}>Low to High</label>
        </Box>
<br />
        <Box>
            <input type="radio" value='desc' name='sortBy' defaultChecked={sortBy === 'desc'}/>
            <label style={{marginLeft:"10px"}}>High to Low</label>
        </Box>
    </Box>
</Box>
  )
}

export default FilterWomen