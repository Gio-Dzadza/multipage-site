import {useParams, useHistory} from 'react-router-dom'
import { useFetch } from "../hooks/useFetch"
import { useEffect } from 'react';

export default function Articles() {
    const {id} = useParams()
    const url = 'http://localhost:3000/articles/' + id
    const{ data: article, isPending, error } = useFetch(url);
    const history = useHistory()
    const goBack = ()=>{
        history.goBack();
    }

    useEffect(()=>{
        if(error){
            setTimeout(()=>{
                history.push("/")
            },2000)
        }
    },[error, history])

  return (
    <div>
        {isPending && <div>Loading...</div>}
        {error && <div>{error}</div>}
        {article && (
            <div>
                <button onClick={goBack}>Go Back</button>
                <h2>{article.title}</h2>
                <p>By {article.author}</p>
                <p>{article.body}</p>
            </div>
        )}
    </div>
  )
}
