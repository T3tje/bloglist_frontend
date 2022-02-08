import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [succMsg, setSuccMsg] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loginUserJSON = window.localStorage.getItem("loggedBlogUser")

    if (loginUserJSON) {
      const user = JSON.parse(loginUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        "username": username,
        "password": password
      })
      
      setUser(user)
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setPassword("")
      setUsername("")
      setSuccMsg("succesfully logged in")
      setTimeout(() => setSuccMsg(null), 5000)
    } catch (excepion){
      setErrMsg("login failed")
      setTimeout(() => setErrMsg(null), 5000)
    }

    
  }

  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    window.localStorage.removeItem("loggedBlogUser")
    setSuccMsg("succesfully logged out")
    setTimeout(() => setSuccMsg(null), 5000)
  }

  const handlePost = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.create(
          {
            title, author, url
          }
        )
      const newBlogs = blogs.concat(response)
      setBlogs(newBlogs)
      setSuccMsg("blog succesfully added")
      setTimeout(() => setSuccMsg(null), 5000)
    } catch {
      setErrMsg("blog creation failed")
      setTimeout(() => setErrMsg(null), 5000)
    }
  }

  const showLogin = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username 
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          password 
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">login</button>
        </div>
        
      </form>
    </div>
  )

  const showName = () => (
    <div>
      <p>{user.name} is logged in</p>
      <button type="button" onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      <form onSubmit={handlePost}>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
        url:
        <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">create</button>

      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  
  return(
    <div>
      <h2>blogs</h2>
      <p style={{color:"green"}}>{succMsg}</p>
      <p style={{color: "red"}}>{errMsg}</p>
      {user === null
      ? showLogin()
      : showName()
      }
    </div>
  )
  
}

export default App