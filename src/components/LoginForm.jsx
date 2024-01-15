import React from 'react'

const LoginForm = () => {
  return (
    <form className='flex flex-col gap-8 px-10 py-6 min-w-[500px]'>
        <div className='flex flex-col items-center gap-2'>
            <img src="/assets/png-clipart-logo-product-design-brand-irrigation-essential-oil-poster-leaf-logo-removebg-preview 1.png" alt="" className='h-10'/>
            <p className='font-bold text-[24px] text-gray-900'>Sign in to your account</p>
        </div>
        <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1'>
                <p className='text-[14px] font-medium leading-6 text-gray-900'>Email</p>
                <input type="email" name="email" placeholder='Enter Your Email Address' className='w-full px-1 py-[6px] rounded-[4px] bg-transparent text-[12px] text-gray-900 placeholder:text-gray-300 border-[2px] border-gray-400 outline-none focus:border-black transition-colors placeholder:text-[12px]'/>
            </div>
            <div className='flex flex-col gap-1'>
                <p className='text-[14px] font-medium leading-6 text-gray-900'>Password</p>
                <input type="password" name="password" placeholder='Enter Your Password' className='w-full px-1 py-[6px] rounded-[4px] bg-transparent text-[12px] text-gray-900 placeholder:text-gray-300 border-[2px] border-gray-400 outline-none focus:border-black transition-colors placeholder:text-[12px]'/>
            </div>
        </div>
        <div className='flex justify-end'>
            <p className='font-medium text-[#138F2E] text-[12px]'>Dont have an account ? <a href="#" className='hover:underline decoration-[#138F2E]'>Register Here</a></p>
        </div>
        <button className='w-full rounded-full bg-[#138F2E] text-white font-bold border-[2px] border-[#138F2E] py-1 hover:bg-white hover:text-[#138F2E] transition-colors duration-300'>Submit</button>
    </form>
  )
}

export default LoginForm