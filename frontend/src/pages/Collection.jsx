import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItems from "../components/ProductItems";

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [subCatagory, setSubCatagory] = useState([]);

  const toggleCatagory = (e) => {
    if (catagory.includes(e.target.value)) {
      setCatagory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCatagory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCatagory = (e) => {
    if (subCatagory.includes(e.target.value)) {
      setSubCatagory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCatagory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (catagory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        catagory.includes(item.catagory),
      );
    }
    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    setFilterProducts(products);
  }, []);

  useEffect(() => {
    applyFilter();
  }, [catagory, subCatagory]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>
        {/* Catagory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Men"}
                onChange={toggleCatagory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Women"}
                onChange={toggleCatagory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Kids"}
                onChange={toggleCatagory}
              />
              Kids
            </p>
          </div>
        </div>

        {/* Sub Catagory FIlter */}
        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Topwear"}
                onChange={toggleSubCatagory}
              />
              Top wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Bottomwear"}
                onChange={toggleSubCatagory}
              />
              Bottom Wear
            </p>
            <p className="flex gap-2">
              <input
                type="checkbox"
                className="w-3"
                value={"Winterwear"}
                onChange={toggleSubCatagory}
              />
              Winter Wear
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4 ">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          {/* Product Sort */}
          <select className="border border-gray-300 text-sm px-2">
            <option value="Relevant" className="">
              Sort by: Relevant
            </option>
            <option value="low-high" className="">
              Sort by: Low to High
            </option>
            <option value="high-low" className="">
              Sort by: High to Low
            </option>
          </select>
        </div>
        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItems
              key={index}
              id={item._id}
              name={item.name}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
