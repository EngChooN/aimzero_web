export default function TwitchTest() {
    const clientId = "g9f6zt2td3os6cngpttme22toxmdhq";
    const clientSecret = "v7uhex96w0yz4ajbxrts3ah9mp8kog";
    const redirectUri = "https://papayaplay.com";

    // Step 1: Twitch OAuth 인증 코드 얻기
    const getOAuthCode = () => {
        // 사용자를 Twitch 인증 페이지로 리디렉션합니다.
        location.href = `https://id.twitch.tv/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=viewing_activity_read`;
    };

    // Step 2: Twitch OAuth 인증 코드를 사용하여 액세스 토큰 얻기
    const getAccessToken = (code: any) => {
        fetch("https://id.twitch.tv/oauth2/token", {
            method: "POST",
            headers: {
                "Client-ID": clientId,
                "Client-Secret": clientSecret,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `client_id=${clientId}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code&redirect_uri=${redirectUri}`,
        })
            .then((response) => response.json())
            .then((data) => {
                const accessToken = data.access_token;

                // Step 3: 얻은 액세스 토큰을 사용하여 Twitch API 호출
                fetch("https://api.twitch.tv/helix/users", {
                    headers: {
                        "Client-ID": clientId,
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                    .then((response) => response.json())
                    .then((userData) => {
                        console.log("Twitch User Info:", userData.data[0]);
                    })
                    .catch((error) => {
                        console.error("Error fetching user info:", error);
                    });
            })
            .catch((error) => {
                console.error("Error getting access token:", error);
            });
    };

    return <button onClick={getOAuthCode}>트위치드롭!</button>;
}
