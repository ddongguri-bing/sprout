import { axiosInstance } from ".";

// 사용자 목록
export const getUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/users/get-users`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// (특정) 사용자 정보
export const getSpecificUser = async (id: string) => {
  try {
    const { data } = await axiosInstance.get(`/users/${id}`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

// 사용자 프로필 이미지 변경

// 사용자 비밀번호 변경
// export const putUpdatePw = async () => {
//   try {
//     const { data } = await axiosInstance.put(`/settings/update-password`, {
//       headers: {
//         Authorization: `Bearer `, // 왜 인증이 안된다고 뜰까? 401 에러
//       },
//       body: {
//         password: "subin1",
//       },
//     });
//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };
