import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box,Checkbox,Heading } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import Styles from "../Styles/mens.module.css"
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
        const params = {}
        dis && (params.dis = dis);
        sortBy && (params.sortBy = sortBy);
        setSearchParams(params)
    }
  },[dis,searchParams,sortBy])

  return (

    <Accordion allowToggle w="200px" className={Styles.filters}>
        <AccordionItem>
            <AccordionButton>
                <Box flex='1' textAlign='left'>
                  <Heading as='h3' size='lg' style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>Filters</Heading>
                </Box>
                <AccordionIcon/>
            </AccordionButton>

            <AccordionPanel pb={4}>
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
            </AccordionPanel>
        </AccordionItem>


        <AccordionItem>
            <AccordionButton>
                <Box flex='1' textAlign='left'>
                    <Heading as='h3' size='lg' style={{fontSize:"20px",fontWeight:"bold",marginBottom:"10px"}}>Sort</Heading>
                </Box>
                <AccordionIcon/>
            </AccordionButton>
            <AccordionPanel pb={4}>
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
            </AccordionPanel>
        </AccordionItem>
    </Accordion>

  )
}

export default FilterMens