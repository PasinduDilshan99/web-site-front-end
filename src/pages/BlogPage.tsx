import Footer from '@/app/components/footer/Footer'
import BlogCard from '@/components/blog-components/BlogCard'
import BlogFilter from '@/components/blog-components/BlogFilter'
import BlogHeroSection from '@/components/blog-components/BlogHeroSection'
import LinkBar from '@/components/common-components/linkBar/LinkBar'
import NavBar from '@/components/common-components/navBar/NavBar'
import React from 'react'

const BlogPage = () => {
  return (
       <div>
      <div>
        <LinkBar />
      </div>
      <div>
        <NavBar />
      </div>
      <div>
        <BlogHeroSection />
      </div>
      <div>
        <BlogFilter/>
      </div>
      <div>{
        // called the API and get the data and map the list into blogcard
        }
        <BlogCard/>
      </div>
       <div>
        <Footer/>
      </div>
    </div>
  )
}

export default BlogPage
