import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Spinner,
  SimpleGrid,
  Box,
  Text,
  Button,
  Select,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("asc");
  const [filter, setFilter] = useState("");

  const getProducts = (sort, filter) => {
    let url = `https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?sort=price&order=${sort}&filter=category=order=${filter}`;

    axios({
      method: "get",
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log("Fetched products:", response.data.data);
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
        setError(true);
        setLoading(false);
      });
  };

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    getProducts(sort, filter);
  }, [sort, filter, searchParams]);

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", color: "red", fontSize: "30px" }}>
        Home Page
      </h1>

      <Select
        placeholder="Sort by Price"
        mt={4}
        ml={2}
        width={"300px"}
        mb={4}
        onChange={handleSort}
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </Select>

      <Select
        placeholder="Filter by Category"
        mt={4}
        ml={2}
        width={"300px"}
        mb={4}
        onChange={handleFilter}
      >
        <option value="">All</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Kids">Kids</option>
        <option value="Home Decor">Home Decor</option>
      </Select>

      {loading ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      ) : error ? (
        <Text color="red.500">Something went wrong</Text>
      ) : (
        <div>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10}>
            {products.map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={4}
              >
                <Text mt={2} fontWeight="bold">
                  {product.title}
                </Text>
                <Text>{product.category}</Text>
                <Text>${product.price}</Text>
                <Button colorScheme="red" mt={4}>
                  More Details
                </Button>
                <Button colorScheme="green" mt={4} ml={2}>
                  Add to Cart
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </div>
      )}
    </>
  );
}

export default Home;

