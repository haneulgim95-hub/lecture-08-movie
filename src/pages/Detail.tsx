import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type MovieDetail = {
    Title: string;
    Year: string;
    Poster: string;
    Plot: string;
    Genre: string;
    Director: string;
};

const Loading = styled.div`
    padding: 30px;
    text-align: center;
    font-size: 1.5rem;
`;

const Container = styled.div`
    padding: 20px;
    width: 100%;
    max-width: 800px;
    margin: 30px auto;
    background-color: #c7c7c7;
    border-radius: 8px;
`;

const BackBtn = styled.button`
    background-color: #e8e8e8;
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
    font-weight: 600;
    &:hover {
        background-color: #848383;
    }
`;

const Article = styled.article`
    background-color: white;
    border-radius: 8px;
    margin-top: 20px;
    display: flex;
    overflow: hidden;
    height: 600px;
`;

const MoviePoster = styled.img`
    width: 50%;
`;

const Content = styled.div`
    padding: 20px;
    flex: 1;
    background-color: #e8e8e8;
    display: flex;
    flex-direction: column;
`;

const Year = styled.div`
    color: #2a2a2a;
    margin-bottom: 24px;
`;

const Tema = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 6px;
    color: #2a2a2a;
`;

const Plot = styled.div`
    padding: 12px;
    background-color: white;
    border-radius: 8px;
    margin-top: 20px;
    flex: 1;
    overflow-y: auto;
`;

function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then((json: MovieDetail) => setMovie(json))
            .catch(err => console.log(err));
    }, [id]);

    if (!movie) return <Loading>Loading...</Loading>;

    return (
        <Container>
            <BackBtn onClick={() => navigate(-1)}>뒤로 가기 </BackBtn>
            <Article>
                <MoviePoster src={movie.Poster} alt={movie.Title} />
                <Content>
                    <h2>{movie.Title}</h2>
                    <Year>{movie.Year}</Year>
                    <Tema>
                        <span>장르</span>
                        <span>{movie.Genre}</span>
                    </Tema>
                    <Tema>
                        <span>Director</span>
                        <span>{movie.Director}</span>
                    </Tema>
                    <Plot>{movie.Plot}</Plot>
                </Content>
            </Article>
        </Container>
    );
}

export default Detail;
