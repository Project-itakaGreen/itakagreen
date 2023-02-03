import React from "react";
import styled from "styled-components";

interface Props {}

const HeaderContainer = styled.header`
  padding: 20px;
  width: 100%;
  height: 60px;
  background: none;
  display: flex;
  background-color: #0a7c38;
  align-items: center;
  z-index: 1;
  position: fixed;
`;

const Logo = styled.img`
  margin-right: 25%;
`;

const HeaderLink = styled.a`
  text-decoration: none;
  font-size: 1.2rem;
  color: white;
  padding: 10px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: transparent;
    border: 2px solid white;
    transform: scale(0);
    transition: all 0.3s ease-in-out 0s;
    border-radius: 3% 20% 0% 50%;
  }

  &:hover:after {
    transform: scale(1);
  }
`;

const Header: React.FC<Props> = () => {
  return (
    <HeaderContainer>
      <Logo src="./images/logoW.svg" alt="Logo" />
      <nav>
        <HeaderLink href="/">Accueil</HeaderLink>
        <HeaderLink href="/details">Détails</HeaderLink>
        <HeaderLink href="/infos">À propos</HeaderLink>
      </nav>
    </HeaderContainer>
  );
};

export default Header;
