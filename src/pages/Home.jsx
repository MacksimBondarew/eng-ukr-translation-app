import WordForm from "components/WordForm/WordForm";
import WordsList from "components/WordsList/WordsList";

export const Home = ({addWords, checkWord, words, deleteWord, editWord}) => {
    return (
        <>
            <WordForm addWords={addWords} />
            <WordsList
                checkWord={checkWord}
                words={words}
                deleteWord={deleteWord}
                editWord={editWord}
            />
        </>
    );
}