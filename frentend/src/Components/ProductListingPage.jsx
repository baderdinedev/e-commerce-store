import React from "react";
import styled from "styled-components";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import { Slider, Checkbox, FormControlLabel, Select, MenuItem } from "@mui/material";

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: #f9f9f9;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
`;

const SearchInput = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;

  input {
    width: 100%;
    padding: 12px 20px 12px 40px;
    font-size: 1rem;
    border: 2px solid #ddd;
    border-radius: 25px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #1e88e5;
    }
  }

  svg {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Sidebar = styled.div`
  width: 250px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SidebarSection = styled.div`
  margin-bottom: 20px;

  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
  }
`;

const ProductGrid = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);

    .add-to-cart {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductDetails = styled.div`
  padding: 15px;

  h4 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 10px;
  }

  p {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 15px;
  }

  .price {
    font-size: 1.1rem;
    color: #1e88e5;
    font-weight: bold;
  }
`;

const AddToCartButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: #1e88e5;
  color: #fff;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #1565c0;
  }
`;

const ProductListingPage = () => {
  const products = [
    {
      id: 1,
      image: "https://via.placeholder.com/250x200.png?text=Product+1",
      title: "Product 1",
      description: "This is a description for Product 1.",
      price: "$29.99",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/250x200.png?text=Product+2",
      title: "Product 2",
      description: "This is a description for Product 2.",
      price: "$49.99",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/250x200.png?text=Product+3",
      title: "Product 3",
      description: "This is a description for Product 3.",
      price: "$19.99",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/250x200.png?text=Product+4",
      title: "Product 4",
      description: "This is a description for Product 4.",
      price: "$39.99",
    },
  ];

  return (
    <PageContainer>
      {/* Search Bar */}
      <SearchContainer>
        <SearchInput>
          <FiSearch size={20} />
          <input type="text" placeholder="Search products..." />
        </SearchInput>
      </SearchContainer>

      {/* Content */}
      <ContentContainer>
        {/* Sidebar */}
        <Sidebar>
          <SidebarSection>
            <h3>Filter by Price</h3>
            <Slider defaultValue={[0, 100]} valueLabelDisplay="auto" />
          </SidebarSection>
          <SidebarSection>
            <h3>Categories</h3>
            <FormControlLabel control={<Checkbox />} label="Category 1" />
            <FormControlLabel control={<Checkbox />} label="Category 2" />
            <FormControlLabel control={<Checkbox />} label="Category 3" />
          </SidebarSection>
          <SidebarSection>
            <h3>Sort By</h3>
            <Select fullWidth defaultValue="price">
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="rating">Rating</MenuItem>
              <MenuItem value="popularity">Popularity</MenuItem>
            </Select>
          </SidebarSection>
        </Sidebar>

        {/* Product Grid */}
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.title} />
              <ProductDetails>
                <h4>{product.title}</h4>
                <p>{product.description}</p>
                <div className="price">{product.price}</div>
              </ProductDetails>
              <AddToCartButton className="add-to-cart">
                <FiShoppingCart size={20} />
              </AddToCartButton>
            </ProductCard>
          ))}
        </ProductGrid>
      </ContentContainer>
    </PageContainer>
  );
};

export default ProductListingPage;