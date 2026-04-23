import SearchBar from "../components/SearchBar.tsx";
import styled from "styled-components";

const Wrap = styled.div`
    padding: 30px;
`;

function Home() {
    return (
        <Wrap>
            <h1>Movie Search</h1>
            <SearchBar />
        </Wrap>
    );
}
export default Home;
