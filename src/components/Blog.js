import React, { useState } from "react"
import propTypes from "prop-types"


const Blog = ({ blog, updateLike, user, handleDelete }) => {

   const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: "solid",
      borderWidth: 1,
      marginBottom: 5
   }

   const [visible, setVisible] = useState(false)
   const [blogLikes, setBlogLikes] = useState(blog.likes)

   const hideWhenVisible = { display: visible ? "none": "" }
   const showWhenVisible = { display: visible ? "" : "none" }

   const toggleVisibility = () => {
      setVisible(!visible)
   }

   const removeBlog = () => {
      if (window.confirm("really?")){
         handleDelete(blog.id)
      }
   }

   const addLike = () => {
      const newSum = blogLikes + 1
      setBlogLikes(newSum)
      const newObject = {
         title: blog.title,
         url: blog.url,
         author: blog.author,
         likes: newSum,
         id: blog.id,
         user: blog.user
      }
      updateLike(blog.id, newObject)
   }

   return (
      <div style={blogStyle}>
         <div style={hideWhenVisible}>
            {blog.title}<button onClick={toggleVisibility}>view</button>
         </div>

         <div style={showWhenVisible}>
            {blog.title}<button onClick={toggleVisibility}>hide</button><br/>
            {blog.author}<br/>
            {blogLikes} <button onClick={addLike}>like</button>
            {blog.user.name === user.name
               ? <button onClick={removeBlog}>delete</button>
               : null
            }
         </div>
      </div>
   )
}

Blog.propTypes = {
   blog: propTypes.object.isRequired,
   updateLike: propTypes.func.isRequired,
   user: propTypes.object.isRequired,
   handleDelete: propTypes.func.isRequired
}

export default Blog