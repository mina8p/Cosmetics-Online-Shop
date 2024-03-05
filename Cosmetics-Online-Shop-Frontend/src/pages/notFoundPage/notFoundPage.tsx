import { Link } from "react-router-dom";

export default function NotFound () {
    return (
        <div>
      <h1 className="text-3xl font-bold underline">
       NotFound
      </h1>
      
      <div>
      <Link to="/">بازگشت به خانه</Link>
      </div>
      </div>
    )
  }