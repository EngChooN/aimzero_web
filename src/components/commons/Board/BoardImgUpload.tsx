import { SetStateAction, useEffect, useRef, useState } from "react";
import { firebaseStorage } from "firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import styled from "@emotion/styled";

export default function BoardImgUpload(props: {
    imgUrl: string | null;
    setImgUrl: React.Dispatch<SetStateAction<string | null>>;
}) {
    const { imgUrl, setImgUrl } = props;

    const fileInput = useRef<HTMLInputElement>(null);
    // image file
    const [imageUpload, setImageUpload] = useState<any>("");
    // image upload step flag
    const [uploadStep, setUploadStep] = useState(1);

    // select fileInput func (onChange)
    const selectFile = (file: File) => {
        setImageUpload(file);
        console.log(file);
        setUploadStep(2);
    };

    // if change imageUpload value, func start
    useEffect(() => {
        const imageRef = ref(
            firebaseStorage,
            `projectPhoto/${imageUpload.name}`
        ); // storage directory (path, file name)
        if (!imageUpload) return;
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImgUrl(url);
            });
        });
    }, [imageUpload]);

    // 업데이트 할 글의 이미지가 처음부터 존재한다면, 업로드 스탭을 2로 바꿈
    useEffect(() => {
        if (imgUrl) {
            setUploadStep(2);
        }
    }, [imgUrl]);

    return (
        <ImgBox>
            {uploadStep === 1 && (
                <Additional onClick={() => fileInput.current?.click()}>
                    {/* file add btn */}
                    <AiOutlinePlus
                        color={"white"}
                        fontSize={60}
                        style={{ position: "absolute" }}
                    />
                    {/* file input */}
                    <input
                        type={"file"}
                        style={{ display: "none" }}
                        accept="image/*"
                        ref={fileInput}
                        onChange={(e: any) => selectFile(e.target.files[0])}
                    />
                </Additional>
            )}

            {uploadStep === 2 && (
                // img preview
                <SelImgWrapper
                    onClick={() => {
                        setUploadStep(1);
                        setImgUrl(null);
                    }}
                >
                    <AiOutlineClose
                        color={"darkGray"}
                        fontSize={60}
                        style={{
                            position: "absolute",
                            zIndex: 9999999,
                        }}
                    />
                    <SelImg src={imgUrl ?? undefined} />
                </SelImgWrapper>
            )}
        </ImgBox>
    );
}

const ImgBox = styled.div`
    max-width: 230px;
    position: relative;
    margin: 7px;

    margin-bottom: 20px;
`;

const Additional = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 230px;
    height: 230px;
    background-color: lightgray;
    cursor: pointer;
    transition: all 0.3s;

    :hover {
        background-color: darkgray;
    }
`;

const SelImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 230px;
    height: 230px;

    cursor: pointer;
    transition: all 0.3s;
`;

const SelImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    transition: all 0.3s;

    :hover {
        filter: invert(25%);
    }
`;
