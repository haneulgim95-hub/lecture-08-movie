import { useState, type SubmitEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Box = styled.form`
    width: 100%;
    display: flex;
    gap: 8px;
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
    };

    const onChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setKeyword(e.target.value);

    return (
        <Box onSubmit={onSubmit}>
            <Input onChange={onChange} />
            <Button type={"submit"}>
                검색
            </Button>
        </Box>
    );
}

export default SearchBar;
