const client_id = "acc38403d52d3b837ea83f5250ecd0fa";
const redirect_uri = "https://aines-front.run.goorm.site/login/kakao";

export const KakaoAuthUri = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=account_email,gender`;