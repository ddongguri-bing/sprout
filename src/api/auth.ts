import { axiosInstance } from "."

export default const signUpApi= async({email, fullName, password}) =>{
    try{
        const data = await axiosInstance.post("/signup", {
            email, fullName, password,
        });
    if(data){
        console.log("회원가입 성공", data);
        return data;
    } else {
        console.error("회원가입 실패");
    }
    } catch(error){
        console.error("API 요청 오류 발생", error);
    }
}
