import React from 'react'
import NavBar from './children/NavBar'
import Banner from './children/Banner'
import Form from './children/Form'
import Footer from './children/Footer'
import About from './children/About'
import DemuClasses from './children/DemuClasses'

export default function ArabicLanguageHome() {
  return (
    <div className="min-h-screen w-full antialiased text-slate-900" 
         style={{ background: 'linear-gradient(135deg, #FDF5E6 0%, #F3E5AB 100%)' }}>
        
        <div className="relative">
            <NavBar />
            <Banner />
            <About />
            <DemuClasses />
            <Form />
            <Footer />
        </div>
        
        
    </div>
  )
}