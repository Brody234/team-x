"use client"
import * as React from "react";
import Image from "next/image";
import UmassLogo from "../../staticimages/UMassLogo.png"
import { useState } from 'react'
import newRequest from "../utils/UseRequest";
import { useLogin } from "../contexts/LoginContext"
import { useRouter } from "next/navigation";
import Header from "../header/header";


export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPass, setConfirmPass] = useState("")
  const [notis, setNotis] = useState(false)

  const { setToken } = useLogin()
  const router = useRouter()
  const onSignUp = () => {

  }
  const onLogin = async () => {
    const token = await newRequest.post('/auth/register', { email: email, password: password, name: name, hidden: false, emailNotifications: notis, confirmPassword: confirmPass })
    setToken(token.data.token)
    if (token.data) {
      window.location.href = "/"
    }
  }

  return (
    <div className="flex flex-col bg-fuchsia-600">
      <Header />

      <div className="flex justify-center items-center px-16 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 py-9 pr-8 pl-20 mt-2 mb-1 max-w-full bg-green-300 rounded-3xl w-[795px] max-md:flex-wrap max-md:px-5">
          <div className="flex flex-col grow shrink-0 justify-center mt-2 basis-0 w-fit max-md:max-w-full">
            <div className="flex justify-center items-center w-12 h-12 mx-auto bg-white rounded-full">
              <Image src={UmassLogo} alt={"UmassLogo"} style={{ width: "24px", height: "24px" }}></Image>
            </div>
            <div className="self-center mt-6 text-3xl font-medium text-center text-zinc-800">
              Sign up
            </div>
            <button
              className="self-center mt-1 text-base underline text-neutral-900"
              onClick={() => { router.push("/login") }}
            >
              <span className="text-zinc-800">Already have an account?</span>{" "}
              <span className="text-neutral-900">Log in</span>
            </button>

            <div className="mt-12 text-base text-black max-md:mt-10 max-md:max-w-full">
              Your name
            </div>
            <input type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shrink-0 mt-1 h-14 rounded-xl border border-solid bg-stone-50 border-stone-500 border-opacity-30 max-md:max-w-full" style={{ color: "black" }} />

            <div className="flex gap-5 py-0.5 pr-2.5 mt-6 w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto my-auto text-base text-black">
                Your email
              </div>
            </div>
            <input type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shrink-0 mt-1 h-14 rounded-xl border border-solid bg-stone-50 border-stone-500 border-opacity-30 max-md:max-w-full" style={{ color: "black" }} />


            <div className="flex gap-5 py-0.5 pr-2.5 mt-6 w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto my-auto text-base text-black">
                Your password
              </div>
            </div>
            <input
              type="password"
              value={password}

              onChange={(e) => setPassword(e.target.value)}
              className="shrink-0 mt-1 h-14 rounded-xl border border-solid bg-stone-50 border-stone-500 border-opacity-30 max-md:max-w-full" style={{ color: "black" }} />

            <div className="flex gap-5 py-0.5 pr-2.5 mt-6 w-full max-md:flex-wrap max-md:max-w-full">
              <div className="flex-auto my-auto text-base text-black">
                Your password
              </div>
            </div>
            <input
              type="password"
              value={confirmPass}

              onChange={(e) => setConfirmPass(e.target.value)}
              className="shrink-0 mt-1 h-14 rounded-xl border border-solid bg-stone-50 border-stone-500 border-opacity-30 max-md:max-w-full" style={{ color: "black" }} />
            <div style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}>
              <input
                type="checkbox"
                onChange={(e) => { setNotis(!notis) }}
                style={{ height: '25px', width: '25px' }}
              />
              <p style={{ color: "black", marginLeft: "7px" }}>Allow us to send you cool email notifications about events</p>
            </div>


            <button
              className="justify-center items-center px-16 py-4 mt-6 text-2xl font-medium text-center bg-black rounded-[40px] text-zinc-50 max-md:px-5 max-md:max-w-full"
              onClick={onLogin}
            >
              Sign up
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

