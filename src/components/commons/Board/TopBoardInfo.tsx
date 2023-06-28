import { TopBoardInfoType } from "@/types/interfaces/common";
import styled from "@emotion/styled";
import Button from "../Button/Button";
import { useBoardWriter } from "@/hooks/commons";

export default function TopBoardInfo(props: TopBoardInfoType) {
    const { writer, timestamp, updateFunc, deleteFunc } = props;

    return (
        <StyledTopBoardInfo>
            <div>
                <Name>{writer}</Name>
                <Date>{timestamp}</Date>
            </div>
            {useBoardWriter(writer) ? (
                <Btns>
                    <Button
                        label={"update"}
                        backgroundColor={"black"}
                        primary={false}
                        onClick={updateFunc}
                    />
                    <Button
                        label={"delete"}
                        backgroundColor={"black"}
                        primary={false}
                        onClick={deleteFunc}
                    />
                </Btns>
            ) : null}
        </StyledTopBoardInfo>
    );
}

const StyledTopBoardInfo = styled.section`
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;

    @media (max-width: 400px) {
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 90px;
    }

    > div {
        display: flex;
        align-items: center;
        font-family: serif;
    }
`;

const Name = styled.div`
    margin-right: 15px;
    font-size: 18px;
`;

const Date = styled.div`
    color: gray;
    font-size: 13px;
    text-align: center;
`;

const Btns = styled.div`
    display: flex;
    justify-content: flex-end;

    > button {
        margin: 0px;
        margin-left: 10px;
        width: 100%;
        height: 20px;
    }
`;
