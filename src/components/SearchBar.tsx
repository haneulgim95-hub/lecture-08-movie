import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Box = styled.form`
    width: 500px;
    display: flex;
    gap: 8px;
    margin-top: 12px;
`;

const Input = styled.input`
    flex: 1;
    padding: 12px;
    border-radius: 6px;
    border: 1px solid #9b9b9b;

    &:focus {
        outline: none;
        border-color: dodgerblue;
    }
`;

const Button = styled.button`
    padding: 12px 24px;
    border-radius: 6px;
    border: none;
    background-color: #d4d3d3;
    color: #2a2a2a;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    &:hover {
        background-color: dodgerblue;
        color: white;
    }
`;

function SearchBar() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const k = keyword.trim();
        if (!k) return;

        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
        // 사용자를 강제 이동 시키는데(Link나 a태그나, navigate), 그 주소에 첫 글자가 /로 시작하지 않으면
        // 지금 현재의 주소 + search로 이동시킴
        // 그 주소에 첫 글자가 /로 시작하면
        // /search로 이동시킴

        // 지금 현재 사용자가 보고 있는 페이지: board/3
        // 이 상태에서 사용자를 "search"주소로 이동시킨다면 => board/3/search
        // 사용자를 "/search"로 이동시킨다면 => /search로 이동된다.
    };

    const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setKeyword(e.target.value);

    return (
        <Box onSubmit={onSubmit}>
            <Input onChange={onChange} />
            <Button type={"submit"}>
                Search
            </Button>
        </Box>
    );
}

export default SearchBar;
