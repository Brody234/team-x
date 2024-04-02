import * as React from "react";
import Image from "next/image";

interface MyComponentProps {
  onLogin: () => void;
  onSignUp: () => void;
  onFacebookLogin: () => void;
  onGoogleLogin: () => void;
  onForgotPassword: () => void;
}

function MyComponent({
  onLogin,
  onSignUp,
  onFacebookLogin,
  onGoogleLogin,
  onForgotPassword,
}: MyComponentProps) {
  return (
    <div className="flex flex-col bg-fuchsia-600">
      <div className="items-center pt-10 pr-16 pb-16 pl-20 w-full text-7xl font-medium tracking-tighter text-center text-lime-800 bg-neutral-300 leading-[70px] max-md:px-5 max-md:max-w-full max-md:text-4xl">
        UMass Social Event Planner
      </div>
      <div className="flex justify-center items-center px-16 py-20 w-full bg-white max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 py-9 pr-8 pl-20 mt-2 mb-1 max-w-full bg-green-300 rounded-3xl w-[795px] max-md:flex-wrap max-md:px-5">
          <div className="flex flex-col grow shrink-0 justify-center mt-2 basis-0 w-fit max-md:max-w-full">
            <div className="shrink-0 self-center w-12 h-12 rounded-full bg-stone-300" />
            <div className="self-center mt-6 text-3xl font-medium text-center text-zinc-800">
              Log in
            </div>
            <button
              className="self-center mt-1 text-base underline text-neutral-900"
              onClick={onSignUp}
            >
              <span className="text-zinc-800">Don't have an account?</span>{" "}
              <span className="text-neutral-900">Sign up</span>
            </button>
            <button
              className="flex justify-center items-center px-16 py-5 mt-11 text-2xl bg-green-100 border border-solid border-zinc-800 rounded-[40px] text-zinc-800 max-md:px-5 max-md:mt-10 max-md:max-w-full"
              onClick={onFacebookLogin}
            >
              <div className="flex gap-4 justify-center">
                {/*<Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/5526994e82e6295c5b96c854644b6c99d99bd584ca53c7d212e87dfcb3c243e2?apiKey=5dae5ef57ad5455f936c1271fb64f3c0&"
                  alt="Facebook logo"
                  className="shrink-0 w-8 border border-black border-solid aspect-square fill-white stroke-[1px] stroke-black"
                  width={32}
                  height={32}
                />*/}
                <div>Log in with Facebook</div>
              </div>
            </button>
            <button
              className="flex justify-center items-center px-16 py-5 mt-4 text-2xl bg-green-100 border border-solid border-zinc-800 rounded-[40px] text-zinc-800 max-md:px-5 max-md:max-w-full"
              onClick={onGoogleLogin}
            >
              <div className="flex gap-4 justify-center">
                {/*<Image
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/202a80eb418dc9ecd2760ef5ef914f979adfb5b7d3bc976c3f0e387d4bf8ff84?apiKey=5dae5ef57ad5455f936c1271fb64f3c0&"
                  alt="Google logo"
                  className="shrink-0 my-auto w-6 aspect-square"
                  width={24}
                  height={24}
                />*/}
                <div>Log in with Google</div>
              </div>
            </button>
            <div className="flex gap-5 items-center mt-10 text-2xl whitespace-nowrap text-stone-500 max-md:flex-wrap">
              <div className="flex-1 shrink-0 self-stretch my-auto h-0.5 bg-stone-500 bg-opacity-30" />
              <div className="self-stretch">OR</div>
              <div className="flex-1 shrink-0 self-stretch my-auto h-0.5 bg-stone-500 bg-opacity-30" />
            </div>
            <div className="mt-12 text-base text-black max-md:mt-10 max-md:max-w-full">
              Your email
            </div>
            <div className="shrink-0 mt-3.5 h-14 bg-red-50 rounded-xl border border-solid border-zinc-800 border-opacity-30 max-md:max-w-full" />
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
                <div>Hide</div>
              </div>
            </div>
            <div className="shrink-0 mt-1 h-14 rounded-xl border border-solid bg-stone-50 border-stone-500 border-opacity-30 max-md:max-w-full" />
            <button
              className="self-end mt-2 text-base text-right underline text-neutral-900"
              onClick={onForgotPassword}
            >
              Forget your password
            </button>
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

export default MyComponent;