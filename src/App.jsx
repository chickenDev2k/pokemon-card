import { useEffect, useState } from "react";
import { getAllPokemon } from "./utils/pokemon";
import { getPokemon } from "./utils/pokemon";
import Card from "./components/card/Card";
import NavBar from "./components/NavBar/NavBar";

function App() {
    const initialURL = "https://pokeapi.co/api/v2/pokemon";
    const [loading, setLoading] = useState(true);
    const [pokemonData, setPokemonData] = useState([]);
    const [nextUrl, setNextUrl] = useState("");
    const [prevUrl, setPrevUrl] = useState("");

    useEffect(() => {
        const fetchPokemonData = async () => {
            //GET ALL pokemon
            let res = await getAllPokemon(initialURL);

            //get detail
            loadPokemon(res.results);
            // console.log(res);
            setLoading(false);
            setNextUrl(res.next);
            setPrevUrl(res.previous);
        };
        fetchPokemonData();
    }, []);
    const loadPokemon = async (data) => {
        let _pokemonData = await Promise.all(
            data.map((pokemon) => {
                // console.log(pokemon);
                let pokemonRecord = getPokemon(pokemon.url);
                // console.log(pokemonRecord);
                return pokemonRecord;
            })
        );
        setPokemonData(_pokemonData);
    };

    // console.log(pokemonData);
    const handlePrevPage = async () => {
        if (!prevUrl) return;
        setLoading(true);
        if (prevUrl.length > 0) {
            let data = await getAllPokemon(prevUrl);
            await loadPokemon(data.results);
            if (data.previous) {
                setPrevUrl(data.previous);
            } else {
                setPrevUrl("");
            }
            setNextUrl(data.next);
        }
        setLoading(false);
    };
    const handleNextPage = async () => {
        setLoading(true);
        let data = await getAllPokemon(nextUrl);
        console.log(data.previous, "ssss");
        await loadPokemon(data.results);
        setPrevUrl(data.previous);
        setNextUrl(data.next);
        setLoading(false);

        console.log("=====");
        console.log(prevUrl);
    };

    return (
        <>
            <NavBar />
            <div className="App">
                {loading ? (
                    <h1>Loading ...</h1>
                ) : (
                    <>
                        <div className="pokemonCardContainer">
                            {pokemonData.map((pokemon, i) => {
                                return <Card key={i} pokemon={pokemon} />;
                            })}
                        </div>
                    </>
                )}
            </div>
            <div className="btn">
                <button onClick={handlePrevPage} disabled={!prevUrl || loading}>
                    Prev
                </button>
                <button onClick={handleNextPage} disabled={!nextUrl || loading}>
                    Next
                </button>
            </div>
        </>
    );
}

export default App;
