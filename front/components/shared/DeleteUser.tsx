import axios from "axios";
import router from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from 'js-cookie'

export default function DeleteUser({auth}:any) {

    const backUrl = process.env.BACK_URL;
    const frontUrl = process.env.FRONT_URL;

    const [deletedCookie, setDeletedCookie] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userId, setUserid] = useState(null);
    const [route, setDeleteRoute] = useState(null);
  
    const handleDeleteUser = (domainId: any, route: any ) => {
        setUserid(domainId);
        setDeleteRoute(route);
      
      if(isModalOpen)
        handleModalCancel();
      else
        setIsModalOpen(true)
    };

    const handleModalOk = async () => {
      if (!userId) return;
      const headers = {
        Authorization: `Bearer ${auth}`,
      };
    
      if (auth) {
        try {
          const response = await axios.delete(backUrl+`${route}`, { headers });
          router.push(`${frontUrl}`);
        } catch (error) {
          console.error(error);
          throw error;
        }
      } else {
        router.push(backUrl + "/api/auth/google/login");
      }
  
      setIsModalOpen(false);
      setUserid(null);
    };
  
    const handleModalCancel = () => {
      setIsModalOpen(false);
      setUserid(null);
    };
    return (
        <>
         {isModalOpen && (
          <PopupRecord>
            <p>Voulez-vous vraiment supprimer votre compte?</p>
            <button onClick={handleModalOk}>OUI</button>
            <button onClick={handleModalCancel}>NON</button>
          </PopupRecord>
        )}
        <ButtonDelete onClick={()=>handleDeleteUser(auth,`/api/user`)}>
            SUPPRESSION DU COMPTE
        </ButtonDelete>
        </>
    )

    
}

const ButtonDelete = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: #f46e6e;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  border: solid 1px #f46e6e;
  background-color: transparent;
  &:hover {
    color: white;
    border: solid 1px #f46e6e;
    background-color: #f46e6e;
  }
`;

const PopupRecord = styled.div`
    position: fixed;
    top: 10vh;
    width: 300px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
    z-index: 2;
    left: calc(50% - 150px);
    p{
      font-size: 1.3em;
      text-align: center;
    }

    button{
      position: relative;
      display: flex;
      align-items: center;
      color: #f46e6e;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
      border: solid 1px #f46e6e;
      background-color: transparent;
      &:hover {
        border-radius: 3% 20% 0% 50%;
        color: white;
        border: solid 1px #f46e6e;
        background-color: #f46e6e;
      }
    }
`;
