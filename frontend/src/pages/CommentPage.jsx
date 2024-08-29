import React, { useState } from 'react'
import CommentCard from '../components/CommentCard'
import { useParams } from 'react-router-dom';

function CommentPage() {
    const data = useParams();
    const [commentsValue, setCommentsValue] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCommentToggle = async ({ e, id }) => {
        e.preventDefault();
        try {
          setLoading(true);
          const res = await fetch(`http://localhost:5000/api/product/get/${id}`);
          const data = await res.json();
          if (data.success === false) {
            setLoading(false);
            setError(data.message);
            return;
          }
          setCommentsValue(data.comments);
          setLoading(false);
          setError(null);
        } catch (error) {
          setLoading(false);
          setError(error.message);
        }
      };
  return (
    <div>
      <CommentCard Comments={commentsValue}
                       />
    </div>
  )
}

export default CommentPage
