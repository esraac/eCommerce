import React, { useContext, useEffect, useState } from 'react'
import Title from "../components/Title"
import {ShopContext} from "../context/ShopContext"
import Item from "../components/Item"
import ShowSearch from '../components/ShowSearch'

const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext)
  const [category, setCategory]=useState([])
  const [subCategory, setSubCategory]=useState([])
  const [sortType, setSortType]=useState("relevant")
  const [filteredProducts, setFilteredProducts] = useState([])

  const toogleFilter = (value, setState)=>{
    setState((prev)=>
    prev.includes(value) ? prev.filter((item)=> item !==value):
    [...prev,value]
  )}
  
  const applyFilters = ()=>{
    let filtered = [...products];

    if(search&& showSearch){
      filtered=filtered.filter((product)=>
      product.name.toLowerCase().includes(search.toLowerCase()))
    }


    if(category.length){
      filtered=filtered.filter((product)=>
        category.includes(product.category))
    }

    if(subCategory.length){
      filtered= filtered.filter((product)=>
        subCategory.includes(product.subCategory))
    }

    return filtered
  }

  const applySorting = (productList) =>{
    switch(sortType){
      case "low":
        return productList.sort((a,b)=> a.price-b.price);
      case "high":
        return productList.sort((a,b)=> b.price-a.price);
      default:
        return productList;
    }
  }

  useEffect(()=>{
    let filtered= applyFilters()
    let sorted = applySorting(filtered)
    setFilteredProducts(sorted)
  },[category, subCategory, sortType, products, search, showSearch])
  
  return (
    <section className='max-padd-container'>
      <div className='flex flex-col sm:flex-row gap-8 mt-8 xl:mt-6'>
        {/*Filter */}
        <div className='min-w-60 bg-white p-4 rounded-2xl'>
          {/*Search */}
          <ShowSearch />
          {/*Category Filter */}
          <div className='bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl'>
            <h5 className='h5 mb-4'>Categories</h5>
            <div className='flex flex-col gap-2 text-sm font-light'>
              {["Men", "Women", "Kids"].map((category)=>(
                <label key={category} className='flex gap-2 medium-14 text-gray-30'>
                  <input onChange={(e)=>toogleFilter(e.target.value,setCategory)} type="checkbox" value={category} className='w-3'/>
                  {category}
                </label>
              ))}
            </div>
          </div>

          {/*Type Filter*/}
          <div className='bg-primary ring-1 ring-slate-900/5 pl-5 py-3 mt-6 rounded-xl'>
          <h5 className='h5 mb-4'>Types</h5>
            <div  className='flex flex-col gap-2 text-sm font-light'>
              {["Topwear", "Bottomwear", "Winterwear"].map((subCategory)=>(
                <label key={subCategory} className='flex gap-2 medium-14 text-gray-30'>
                  <input onChange={(e)=>toogleFilter(e.target.value, setSubCategory)} type="checkbox" value={subCategory} className='w-3'/>
                  {subCategory}
                </label>
              ))}
            </div>
          </div>

          {/*Sort By*/}
          <select onChange={(e)=>setSortType(e.target.value)} className='medium-14 h-8 w-full border border-slate-900/5 bg-primary text-gray-30 rounded-lg px-2 outline-none mt-6'>
            <option value="relevant" className='font-medium text-sm'>Sort by: Relevant</option>
            <option value="low" className='font-medium text-sm'>Sort by: Low</option>
            <option value="high" className='font-medium text-sm'>Sort by: High</option>
          </select>
        </div>
       {/* right side */}
       <div className='bg-white p-4 rounded-2xl'>
        <Title title= {`Our Collection`}/>
        {/*p container */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-6'>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product)=>(
              <Item product={product} key={product._id}/>
            ))
          ): (
            <p className='capitalize'>No products found for selected filters.</p>
          )}
          </div>
        </div> 
      </div>
    </section>
  )
}

export default Collection