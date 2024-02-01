import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImageBox = styled.img`
    margin-top: 10%;
    margin-bottom: 10px;
    width: 40%;
    height: 50%;
`;

const InputBox = styled.input`

    height: 40px;
    width: 40%;
    font-size: 15px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);

`;


const Input = () => {
    const [PI, setPI] = useState("")
    const [PIValue, setPiValue] = useState("")
    const [value, setValue] = useState("")
    const [timer, setTimer] = useState()


    useEffect(()=> {
        fetch('/public/pi.txt') // 'static' 폴더에 있는 'yourfile.txt' 파일 경로
        .then(response => response.text())
        .then(text => {
            setPI(text);
        })
        .catch(error => {
            console.error('Error reading text file:', error);
        });
        // });
    }, [])
    console.log("PI", PI.length)
    const handleInput = (e) => {
        setValue(e.target.value);
        if (timer){ 
            clearTimeout(timer)  }      
        let newTimer = setTimeout((
        ) => {
            setPiValue((prev)=>{
                console.log("value", e.target.value)
                PI.slice(e.target.value)
                
            })
        }, 800);
        setTimer(newTimer)
    };
    console.log("test", PIValue)
    return <Container>
        <ImageBox src={"http://localhost:3000/pi.png"} />
        <InputBox
                type="text"
                id="value"
                name="value"
                value={value}
                placeholder="원하는 인덱스"
                onChange={(e) => handleInput(e)}
            />
        <div>안녕 {PIValue}</div>

    </Container>
}


export default Input