"use client"
import * as React from "react";
import Image from "next/image";
import UmassLogo from "../../staticimages/UMassLogo.png"
import {useState} from 'react'
import newRequest from "../utils/UseRequest";
import {useLogin} from "../contexts/LoginContext"
import Router from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {setToken} = useLogin()
  const onSignUp = () =>{

  }
  const onLogin = async () =>{
    const token = await newRequest.post('/auth/login', {email: email, password: password})
    setToken(token.data)
    console.log(token.data)
    if(token.data){
      window.location.href = "/"
    }
  }

  return (
    <div className="flex flex-col bg-fuchsia-600">
      <div className="items-center pt-10 pr-16 pb-16 pl-20 w-full text-7xl font-medium tracking-tighter text-center text-lime-800 bg-neutral-300 leading-[70px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
        UMass Social Event Planner
      </div>
      <div className="flex justify-center items-center px-16 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 py-9 pr-8 pl-20 mt-2 mb-1 max-w-full bg-green-300 rounded-3xl w-[795px] max-md:flex-wrap max-md:px-5">
          <div className="flex flex-col grow shrink-0 justify-center mt-2 basis-0 w-fit max-md:max-w-full">
            <div style = {{alignItems: "center", alignContent: "center", width: "100%"}}>
              <Image src={UmassLogo} alt = {"UmassLogo"} style = {{width: "24px", height: "24px"}}></Image>
            </div>
            <div className="self-center mt-6 text-3xl font-medium text-center text-zinc-800">
              Log in
            </div>
            <button
              className="self-center mt-1 text-base underline text-neutral-900"
              onClick={()=>{}}
            >
              <span className="text-zinc-800">Already have an account?</span>{" "}
              <span className="text-neutral-900">Log in</span>
            </button>
            
            <div className="mt-12 text-base text-black max-md:mt-10 max-md:max-w-full">
              Your email
            </div>
            <input type = "text" 
            value = {email}
            onChange = {(e)=>setEmail(e.target.value)}
            className="shrink-0 mt-1 h-14 rounded-xl border border-solid bg-stone-50 border-stone-500 border-opacity-30 max-md:max-w-full" style = {{color: "black"}}/>
            <div className="flex gap-5 py-0.5 pr-2.5 mt-6 w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto my-auto text-base text-black">
                Your password
              </div>
              <div className="flex gap-3 text-lg text-right whitespace-nowrap text-stone-500 text-opacity-80">
                {/*<Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0b1f0ae573e473d1948aaba433a505fdec55578b6c99c6a7f0af49cc9991a6a?apiKey=5dae5ef57ad5455f936c1271fb64f3c0&"
                  alt="Hide password"
                  className="shrink-0 w-6 aspect-square"
                  width={24}
                  height={24}
  />*/}
               
              </div>
            </div>
            <input 
            type = "password"
            value = {password}
            
            onChange = {(e)=>setPassword(e.target.value)}
            className="shrink-0 mt-1 h-14 rounded-xl border border-solid bg-stone-50 border-stone-500 border-opacity-30 max-md:max-w-full" style = {{color: "black"}}/>
        
            <button
              className="justify-center items-center px-16 py-4 mt-6 text-2xl font-medium text-center bg-black rounded-[40px] text-zinc-50 max-md:px-5 max-md:max-w-full"
              onClick={onLogin}
            >
              Log in
            </button>
          </div>
          {/*<Image
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d3a70d4e1ae2c46718c4c6d0d4f85a789c9429bc73bdf457a5b845963080df62?apiKey=5dae5ef57ad5455f936c1271fb64f3c0&"
            alt="Close icon"
            className="shrink-0 self-start w-8 aspect-square"
            width={32}
            height={32}
/>*/}
        </div>
      </div>
    </div>
  );
}

