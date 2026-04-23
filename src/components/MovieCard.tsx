import type { MovieType } from "../pages/Search.tsx";
import styled from "styled-components";
import { Link } from "react-router";

const StyledLink = styled(Link)`
    width: calc((100% - 30px) / 2);
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

    img {
        width: 90px;
        height: 120px;
        object-fit: cover;
        border-radius: 4px;
    }

    @media (max-width: 600px) {
        width: 100%;
    }
`;


const Title = styled.h3`
    color: #1a1a1a;
    font-weight: 700;
    margin-bottom: 4px;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Year = styled.span`
    font-size: 12px;
    color: #888;
`;

const Info = styled.div`
    flex: 1;
    min-width: 0;
`;

type Props = { movie: MovieType };

function MovieCard({ movie }: Props) {
    return (
        <StyledLink to={`/detail/${movie.imdbID}`}>
            <img src={movie.Poster} alt={movie.Title} />
            <Info>
                <Title>{movie.Title}</Title>
                <Year>{movie.Year}</Year>
            </Info>
        </StyledLink>
    );
}

export default MovieCard;
