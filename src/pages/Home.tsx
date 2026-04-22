import SearchBar from "../components/SearchBar.tsx";
import styled from "styled-components";

const Wrap = styled.div`
    padding: 30px;
    min-height: 100dvh;
`;

function Home() {
    return (
        <Wrap>
            <header>
                <h2>영화 검색기</h2>
            </header>
            <main>
                <SearchBar />
            </main>
        </Wrap>
    );
}
export default Home;
