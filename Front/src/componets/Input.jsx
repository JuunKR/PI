import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios"
import Swal from 'sweetalert2'
const Container = styled.div`
    display : flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ImageBox = styled.img`
    margin-top: 2%;
    margin-bottom: 10px;
    width: 30%;
    height: 30%;
`;

const InputBox = styled.input`

    height: 4vh;
    width: 30%;
    font-size: 8px;
    border: 0;
    border-radius: 15px;
    outline: none;
    padding-left: 10px;
    background-color: rgb(233, 233, 233);
    &::placeholder{
        font-size: 10px;
    }

`;

const Input = () => {
    const [PIValue, setPiValue] = useState("")
    const [digits, setDigits] = useState("")
    const [timer, setTimer] = useState("")
    const [request, setRequest] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=> {
        if(digits===0){
            setPiValue("")
            setDigits("")
            Swal.fire({
                title: "Error",
                text: "Zero is not available.",
                icon: "error",
                confirmButtonText: "OK"
            })
            return
        }
        if(!request | !digits ) return

        if(digits > 1000000000){
            setPiValue("")
            Swal.fire({
                title: "Error",
                text: "less than or equal to one billion.",
                icon: "error",
                confirmButtonText: "OK"
            })
            return
        }
        setIsLoading(true)
        axios
            .get(`http://localhost:8000/digits/${digits}`)
            .then(function (response){
                setPiValue(response.data.value)
            })
            .catch(function(error){
                console.log(error)
            })

            setRequest((prev) => !prev)
            setIsLoading(false)
    })

    const handleInput = (e) => {
        const value = e.target.value
        if (value.includes('-')) {
            Swal.fire({
                title: "Error",
                text: "Minor is not available.",
                icon: "error",
                confirmButtonText: "OK"
            })
            return
        }
        
        setDigits(() => {
            if (!value){
                setPiValue("")
                return value
            } else {
                return parseInt(value)
            }
        });
        if (timer){ 
            clearTimeout(timer)  }      
        
        let newTimer = setTimeout((
        ) => {
            setRequest((prev)=>!prev
            )
        }, 800);

        setTimer(newTimer)
    };

    return <Container>
        <ImageBox src={"http://localhost:3000/pi.png"} />
        <InputBox
                type="number"
                value={digits}
                placeholder="Enter the digit position you want to know."
                onChange={(e) => handleInput(e)}
            />
        {PIValue ? (<div>The {digits}-th digit of pi is {isLoading? "Loading" : PIValue}</div>) : null}
    </Container>
}


export default Input