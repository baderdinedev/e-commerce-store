import React from "react";
import styled, { keyframes } from "styled-components";
import { FiShoppingCart } from "react-icons/fi";

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleUp = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
`;

// Styled Components
const DiscountSection = styled.section`
  padding: 80px 5%;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #fff;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-in-out;
`;

const SectionDescription = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  animation: ${fadeIn} 1.5s ease-in-out;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  animation: ${fadeIn} 2s ease-in-out;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);

    .shop-now {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const OriginalPrice = styled.span`
  font-size: 1.1rem;
  color: #ff6b6b;
  text-decoration: line-through;
`;

const DiscountedPrice = styled.span`
  font-size: 1.3rem;
  color: #4caf50;
  font-weight: bold;
`;

const ShopNowButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: #1e88e5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #1565c0;
  }
`;

const Discount = () => {
  const discountProducts = [
    {
      id: 1,
      image: "https://via.placeholder.com/250x200.png?text=Product+1",
      title: "Product 1",
      originalPrice: "$59.99",
      discountedPrice: "$39.99",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/250x200.png?text=Product+2",
      title: "Product 2",
      originalPrice: "$79.99",
      discountedPrice: "$49.99",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/250x200.png?text=Product+3",
      title: "Product 3",
      originalPrice: "$99.99",
      discountedPrice: "$69.99",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/250x200.png?text=Product+4",
      title: "Product 4",
      originalPrice: "$49.99",
      discountedPrice: "$29.99",
    },
  ];

  return (
    <DiscountSection>
      <SectionTitle>Discount Products</SectionTitle>
      <SectionDescription>
        Explore our exclusive collection of discounted products. Limited time offer!
      </SectionDescription>
      <ProductGrid>
        {discountProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage src={product.image} alt={product.title} />
            <ProductTitle>{product.title}</ProductTitle>
            <PriceContainer>
              <OriginalPrice>{product.originalPrice}</OriginalPrice>
              <DiscountedPrice>{product.discountedPrice}</DiscountedPrice>
            </PriceContainer>
            <ShopNowButton className="shop-now">
              <FiShoppingCart size={18} style={{ marginRight: "8px" }} />
              Shop Now
            </ShopNowButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </DiscountSection>
  );
};

export default Discount;