import { Search } from 'lucide-react'
import React from 'react'
import { Button } from './ui/button'

const HeroSection = () => {
  return (
    <div className='text-center mt-10'>
       <div className='flex flex-col gap-5'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
        <h1 className=' text-5xl font-bold'>Search.Apply & <br /> Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae soluta voluptas dolorum consequuntur officia veritatis.</p>
        <div className=' flex w-4/10 shadow-lg boarder-gray-200 pl-3  rounded-full items-center gap-4 mx-auto  '>
            <input type="text"
            placeholder='find your dream jobs'
            className='outline-none boarder-none w-full'
            />
            <Button className='rounded-r-full  cursor-pointer bg-[#6A38C2] '>
                <Search />
            </Button>
        </div>
       </div>
        
    </div>
  )
}

export default HeroSection