import React, {useState} from "react"

const BlogForm = ({ createNote }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const addBlog = (event) => {
        event.preventDefault()
        createNote(
            {title, author, url}
        )
        setTitle("")
        setAuthor("")
        setUrl("")
    }

    return(
        <div>
        <h2>create new</h2>
            <form onSubmit={addBlog}>
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
        </div>
    )
}

export default BlogForm