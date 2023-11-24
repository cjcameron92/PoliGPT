"use client"

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

import { useState } from 'react'
import { Inter as FontSans } from "next/font/google"
import { Icons } from '@/components/icons'



export default function IndexPage() {

  const [inputText, setInputText] = useState('') // State to hold the input text
  const [outputText, setOutputText] = useState('') // State to hold the output text
  const [isGenerating, setGenerating] = useState(false)

  // Function to handle the click event of the Generate button
  const asyhandleGenerate = async () => {
    // Logic to process the inputText and set the outputText
    // For now, it's just copying the inputText to outputTexts
    if (!isGenerating) {
      setGenerating(true)
        try {
          const response = await fetch('https://tunnel.poligpt.ca:8000/process_string', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*' // Include CORS header if needed (adjust as necessary)
            },
            body: JSON.stringify({ prompt: inputText })
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          console.log(data);

          setOutputText(data.response);
          setInputText("");
          setGenerating(false);

        } catch (error) {
          console.error(`Error fetching data: `, error)
        }
    }
  }

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
      
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          AI-Driven Canadian Political Analysis
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Provides in-depth, AI-powered insights into Canada&apos;s political scene. It simplifies complex policies and debates, offering users timely and accurate information on Canadian politics. Ideal for students, researchers, and enthusiasts seeking a clearer understanding of the political landscape.
          </p>
          {/* <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href='#'
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div> */}
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Ask us
          </h2>
        </div>
          
      </section>

      {/* New section for the text boxes and button */}
      <section className="container mx-auto py-8">
  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
    {/* Textarea for input */}
    <textarea
      className="w-full sm:w-1/3 p-4 border-2 border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
      placeholder="Message poligpt"
      value={inputText}
      onChange={(e) => {
        setInputText(isGenerating ? inputText : e.target.value);
      }}
    />
    {/* Generate Button */}
    <button
      onClick={asyhandleGenerate}
      className="flex items-center justify-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Generate
      {isGenerating && (
        <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
      )}
    </button>
    {/* Textarea for output */}
    <textarea
      className="w-full sm:w-1/3 p-4 border-2 border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out focus:border-blue-500 focus:ring focus:ring-blue-200"
      placeholder=""
      value={outputText}
      readOnly
    />
  </div>
</section>


    </>
  )
}
