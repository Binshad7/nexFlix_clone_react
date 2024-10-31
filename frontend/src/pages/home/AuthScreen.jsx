// import React from 'react'

import { useState } from "react"
import Header from "../../components/Header"
import Button from "../../utils/Button"
import { ChevronRight } from "lucide-react"
function AuthScreen() {
    const [email, setEmail] = useState('')
    return (
        <div className="hero-bg relative">
            <Header />


            {/* hero section  */}
            <div className="flex flex-col items-center justify-center text-center py-40 text-white max-w-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, Tv Shows, and more</h1>
                <p className="text-lg mb-4">Watch anywhere, Cancel anytime.</p>
                <p className="mb-4">Ready to watch? Enter your email to create ro restart your membership.</p>

                <form className="flex  flex-col md:flex-row gap-4 w-1/2">
                    <input
                        type="email"
                        name="email"
                        value={email}
                        className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button style='bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center' text='Get Started' >
                        <ChevronRight className="size-8 md:size-10" />
                    </Button>
                </form>
            </div>
            {/*  */}
            <div className="h-2 w-full bg-[#232323]" aria-hidden='true' />
            {/* section */}

            <div className="py-10 bg-black text-white">
                <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px2">
                    {/* left */}
                    <div className="">left</div>
                 {/* right */}
                 <div className="">right</div>
                </div>
            </div>
        </div>
    )
}

export default AuthScreen

