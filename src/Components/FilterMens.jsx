import { Box,Checkbox,Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';

const FilterMens = () => {
    const [searchParams,setSearchParams] = useSearchParams()
    const initalParams = searchParams.getAll("dis")
    const [dis,setDis] = useState(initalParams || []);
    const initialSortParams = searchParams.get("sortBy")
    const [sortBy,setSortBy] = useState(initialSortParams || "");

    const handleChange=(e)=>{
        const option = e.target.value;
        let newCat = [...dis]

        if(dis.includes(option)){
            newCat.splice(newCat.indexOf(option),1);
        }
        else{
            newCat.push(option);
        }
        setDis(newCat)
    }

    const handleSortBy=(e)=>{
        setSortBy(e.target.value)
    }

  useEffect(()=>{
        if(dis || sortBy){
            setSearchParams({dis:dis,
            sortBy:sortBy})
        }
  },[dis,searchParams,sortBy,setSearchParams])

//    console.log(searchParams.getAll("cat"))
console.log(sortBy)
  return (
  <Box> 

    <Heading as='h3' size='lg' style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>Filters</Heading>
        <Box>
            <Checkbox type="checkbox" value='T-shirt' onChange={handleChange} defaultChecked={dis.includes('T-shirt')}/>
            <label style={{marginLeft:"10px"}}>T-Shirt</label>
        </Box>
        <br />
        <Box>
            <Checkbox type="checkbox" value=' Shorts' onChange={handleChange} defaultChecked={dis.includes(' Shorts')}/>
            <label style={{marginLeft:"10px"}}>Shorts</label>
        </Box>
        <br />
        <Box>
            <Checkbox type="checkbox" value='Sports Shorts' onChange={handleChange} defaultChecked={dis.includes('Sports Shorts')}/>
            <label style={{marginLeft:"10px"}}>Sports Shorts</label>
        </Box>
        <br />
        <Box>
            <Checkbox type="checkbox" value='Shirt' onChange={handleChange} defaultChecked={dis.includes('Shirt')}/>
            <label style={{marginLeft:"10px"}}>Shirt</label>
        </Box>
        <br />
        <Box>
            <Checkbox type="checkbox" value='Joggers' onChange={handleChange} defaultChecked={dis.includes('Joggers')}/>
            <label style={{marginLeft:"10px"}}>Joggers</label>
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

export default FilterMens