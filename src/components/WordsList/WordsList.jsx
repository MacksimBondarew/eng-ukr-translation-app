import WordsListItem from 'components/WordsListItem/WordsListItem';
import { useSelector } from 'react-redux';
import { selectWords } from 'redux/selectors';

const WordsList = ({ editWord, checkWord }) => {
    const words = useSelector(selectWords);

    return (
        <ul>
            {words.map(({ id, ukrWord, engWord, checked }, index) => {
                return (
                    <WordsListItem
                        key={id}
                        id={id}
                        ukrWord={ukrWord}
                        engWord={engWord}
                        itemNumber={index + 1}
                        editWord={editWord}
                        checked={checked}
                        checkWord={checkWord}
                    />
                );
            })}
        </ul>
    );
};
export default WordsList;
