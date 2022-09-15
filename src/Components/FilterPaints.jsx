import { Box,Heading, Checkbox, Radio } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const FilterPaints = () => {
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
        <div>
            <Checkbox type="checkbox" value='painting' onChange={handleChange}  defaultChecked={cat.includes('painting')}/>
            <label style={{marginLeft:"10px"}}>Painting</label>
        </div>
<br />
        <Heading as='h3' size='lg' style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>Sort</Heading>
    <div onChange={handleSortBy}>
        <div>
            <Radio  value='asc' name='sortBy' defaultChecked={sortBy === 'asc'} />
            <label style={{marginLeft:"10px"}}>Low to High</label>
        </div>
<br />
        <div>
            <Radio  value='desc' name='sortBy' defaultChecked={sortBy === 'desc'}/>
            <label style={{marginLeft:"10px"}}>High to Low</label>
        </div>
    </div>
</Box>
  )
}

export default FilterPaints