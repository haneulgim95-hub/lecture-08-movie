import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../components/SearchBar.tsx";
import MovieCard from "../components/MovieCard.tsx";
export type MovieType = {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string;
};

const Container = styled.div`
    min-height: 100dvh;
    background-color: #f4f6f8;
`;

const Header = styled.header`
    padding: 50px 30px;
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Keyword = styled.h2`
    font-size: 2rem;
`;

const Content = styled.div`
    display: flex;
    gap: 30px;
    margin: 0 auto;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    padding: 30px;
`;


type ApiResponseType = { Search: MovieType[]};


function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [list, setList] = useState<MovieType[]>([]);
    const [loading, setLoading] = useState(true);       // loading에 대한 상태값 관리
    const [error, setError] = useState("");             // 에러가 났을 때 화면에 출력해야 하는 string



    useEffect(() => {
        if (!keyword) return;

        setLoading(true);
        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: ApiResponseType) => {
                setList(json.Search);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setError("검색하는데 오류가 발생하였습니다.");
                setLoading(false);
            });
    }, [keyword]);

    return (
        <Container>
            <Header>
                <Keyword>🔍검색 결과 : {keyword}</Keyword>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                <SearchBar />
            </Header>
            <Content>
                {list.map(val => (
                    <MovieCard movie={val} key={val.imdbID} />
                ))}
            </Content>
        </Container>
    );
}

export default Search;
