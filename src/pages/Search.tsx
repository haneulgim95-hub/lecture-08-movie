import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";
type MovieType = {
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
`;

const Keyword = styled.h2`
    text-align: center;
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

const StyledLink = styled(Link)`
    width: calc((100% - 60px) / 3);
    text-decoration: none;
    border-radius: 8px;
    padding: 12px;
    background-color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border: none;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.5s;
    &:hover {
        background-color: #f3f3f3;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transform: translateY(-5px);
    }
`;

const PosterImage = styled.img`
    width: 90px;
    height: 120px;
    object-fit: cover;
    border-radius: 4px;
`;

const Title = styled.h3`
    color: #1a1a1a;
    font-weight: 700;
    margin-bottom: 4px;
`;

const Year = styled.span`
    font-size: 12px;
    color: #888;
`;


function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");
    const [list, setList] = useState<MovieType[]>([]);

    useEffect(() => {
        if (!keyword) return;
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: { Search: MovieType[] }) => {
                setList(json.Search);
            })
            .catch(err => console.log(err));
    }, [keyword]);

    return (
        <Container>
                <Header>
                    <Keyword>🔍검색 결과 : {keyword}</Keyword>
                </Header>
                <Content>
                    {list.map(val => (
                        <StyledLink to={`/detail/${val.imdbID}`} key={val.imdbID}>
                            <PosterImage src={val.Poster} alt={val.Title} />
                            <div>
                                <Title>{val.Title}</Title>
                                <Year>{val.Year}</Year>
                            </div>
                        </StyledLink>
                    ))}
                </Content>
        </Container>
    );
}

export default Search;
