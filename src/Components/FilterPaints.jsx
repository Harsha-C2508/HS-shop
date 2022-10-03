import { Box,Heading, Checkbox, Radio,Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from '@chakra-ui/react';
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
        const params = {}
        cat && (params.cat = cat);
        sortBy && (params.sortBy = sortBy);
        setSearchParams(params)
    }
  },[cat,searchParams,sortBy])

  return (

  <Accordion allowToggle w="200px">
        <AccordionItem>
            <AccordionButton>
                <Box flex='1' textAlign='left'>
                    <Heading as='h3' size='lg' style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>Sort</Heading>
                </Box>
                <AccordionIcon/>
            </AccordionButton>

            <AccordionPanel>
                <Box onChange={handleSortBy}>
                    <Box>
                        <Radio  value='asc' name='sortBy' defaultChecked={sortBy === 'asc'} />
                        <label style={{marginLeft:"10px"}}>Low to High</label>
                    </Box>
                        <br />
                    <Box>
                        <Radio  value='desc' name='sortBy' defaultChecked={sortBy === 'desc'}/>
                        <label style={{marginLeft:"10px"}}>High to Low</label>
                    </Box>
                </Box>
            </AccordionPanel>
        </AccordionItem>
    </Accordion>

  )
}

export default FilterPaints