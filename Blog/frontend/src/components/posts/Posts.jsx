import React from "react"
import './Posts.css'
export const Posts = ({posts}) => {
    
  console.log(posts)
    
  return (
    <div className='post'>
      {posts.map((post,index) => (
        <div key={index}>
          <img className='postImage' src={`http://127.0.0.1:8000${post.image}`} alt='not found' />
          <div className='postInfo'>
            <div className='postCats'>
              <span className='postCat'>Life</span>
              <span className='postCat'> Sports </span>
            </div>
            <span className='postTitle'>
              {post.title}
            </span>
            <hr/>
            <span className='postDate'> {post.created_on}</span>
          </div>
          <div className="postDesc">
            <p>{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
