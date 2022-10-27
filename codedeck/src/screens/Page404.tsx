import React, { useEffect } from 'react'
import styled from 'styled-components'
import {useNavigate} from "react-router-dom"

const PageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100vh;
    `;
const ContentContainer = styled.div`
    h1{
        font-size: 2.5rem;
        margin-bottom: 1.2rem;
    }
`    


const Page404 = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        setTimeout(()=>{
            navigate("/");
        },10000);
    });


  return (
    <PageContainer>
        <ContentContainer>
        <h1>OOPS!!! Page not found</h1>

        <p>Redirects to home in 10sec</p>
        <p>click here to Redirect now</p>
        </ContentContainer>
    </PageContainer>
  )
}

export default Page404