import jwtDecode from "jwt-decode"
type Data = {
id: number,
username: string,
iat: Date,
exp: Date
}
const payload = (payloadData:string):Data => {
    const newData:Data = jwtDecode(payloadData)
return newData
} 

export default payload