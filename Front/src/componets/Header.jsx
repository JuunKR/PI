import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items:  center;
    margin-top: 5vh;
`

const Header = () =>{

    return <HeaderContainer>
        <p>Hello I am PI lover</p>
    </HeaderContainer>
}

export default Header