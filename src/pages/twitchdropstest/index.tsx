import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function TwitchTest() {
    const router = useRouter();
    const { code } = router.query;

    const clientId = "g9f6zt2td3os6cngpttme22toxmdhq";
    const clientSecret = "v7uhex96w0yz4ajbxrts3ah9mp8kog";
    const redirectUri = "http://localhost:3000/twitchdropstest";
    const scope = "user:read:email"; // 필요한 스코프 설정

    console.log(
        `https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}/twitchdropstest&scope=${scope}`
    );

    const getToken = async () => {
        await axios
            .post("https://id.twitch.tv/oauth2/token", {
                client_id: clientId,
                client_secret: clientSecret,
                code: code,
                grant_type: "authorization_code",
                redirect_uri: redirectUri,
            })
            .then(async (res) => {
                try {
                    console.log("get token!! ", res.data.access_token);
                    localStorage.setItem(
                        "twitch_access_token",
                        res.data.access_token
                    );
                    const accessToken = localStorage.getItem(
                        "twitch_access_token"
                    );

                    await axios
                        .get("https://id.twitch.tv/oauth2/validate", {
                            headers: {
                                Authorization: `OAuth ${accessToken}`,
                            },
                        })
                        .then((res) => {
                            try {
                                console.log(
                                    "get user info!! ",
                                    res.data.login,
                                    res.data.user_id
                                );
                            } catch {
                                alert("get user info error!!");
                            }
                        });
                } catch {
                    console.log("get code error!!");
                }
            });
    };

    useEffect(() => {
        if (router.isReady) {
            console.log("get code!! ", code);
        }
    }, [router]);

    return (
        <div>
            {!code ? (
                <a
                    href={`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`}
                >
                    트위치 로그인
                </a>
            ) : (
                <button onClick={getToken}>연동하기</button>
            )}
        </div>
    );
}
