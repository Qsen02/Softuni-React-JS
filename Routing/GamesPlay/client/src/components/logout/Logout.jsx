import { useContext } from "react"
import { UserContext } from "../../context/userContext"

export default function Logout(){
const {removeUserHandler}=useContext(UserContext);
removeUserHandler();
   return (
       <></>
   )
}