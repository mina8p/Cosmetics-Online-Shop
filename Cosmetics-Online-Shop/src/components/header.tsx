import { Link } from "react-router-dom";


export default function Header() {
  return (
    <div>
      
      <div>
      <Link to="/adminLogin">پنل مدیریت</Link>
      </div>
      <h1 className="text-3xl font-bold underline">
        header
      </h1>
    </div>
  );
}
