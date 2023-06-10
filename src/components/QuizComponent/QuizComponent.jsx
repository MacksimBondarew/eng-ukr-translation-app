import { useState, useEffect } from 'react';
import shuffle from 'lodash.shuffle';
import { useSelector } from 'react-redux';
import { selectWords } from 'redux/selectors';

const getRandomIntegetFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const QuizComponent = ({attemptsQuantity}) => {
    const words = useSelector(selectWords);
    const [checkedWords, setCheckedWords] = useState(filteredWords(words));
    const [randomWord, setRandomWord] = useState(
        checkedWords[getRandomIntegetFromInterval(0, checkedWords.length - 1)]
    );
    const [correct, setCorrect] = useState(0);
    const [wrong, setWrong] = useState(0);
    const [attempts, setAttempts] = useState(attemptsQuantity);

    const variants = getVariants();

    useEffect(() => {
        if (checkedWords.length) {
            setRandomWord(
                checkedWords[
                getRandomIntegetFromInterval(0, checkedWords.length - 1)
                ]
            );
        } else {
            setRandomWord('');
        }
        
    }, [checkedWords]);

    // const notUsibleNowButSetWarning = () => {
    //     setCheckedWords();
    //     setRandomWord();
    // };
    // console.log(notUsibleNowButSetWarning);

    function filteredWords(words) {
        return words.filter(word => word.checked);
    }

    function getVariants() {
        const variants = new Array(4).fill(null).reduce((acc, _, index) => {
            if (!index) {
                return [randomWord];
            }
            const random =
                words[getRandomIntegetFromInterval(0, words.length - 1)];
            if (acc.every(item => item?.id !== random?.id)) {
                return [...acc, random];
            } else {
                let word = null;
                for (let item of words) {
                    if (acc.every(word => word?.id !== item?.id)) {
                        word = item;
                        break;
                    }
                }
                return [...acc, word];
            }
        }, []);

        return shuffle(variants);
    }

    const handleVariant = e => {
        const answerId = e.target.value;
        const trueAnswerId = randomWord.id;

        if (answerId === trueAnswerId) {
            setCheckedWords(checkedWords.filter(({ id }) => id !== answerId));
            setCorrect(correct + 1);
        } else {
            setWrong(wrong + 1);
        }
        setAttempts(attempts - 1);
        // setRandomWord(
        //     checkedWords[
        //         getRandomIntegetFromInterval(0, checkedWords.length - 1)
        //     ]
        // );
    };
    
    const handleRefresh = () => {
        setAttempts(attemptsQuantity);
        setCorrect(0);
        setWrong(0)
    }

    return (
        <div>
            
            {attempts !== 0 && (
                <>
                    <h2>{randomWord.ukrWord}</h2>
                    <p>{`спроб: ${attempts}`}</p>
                </>
            )}

            <p>{`вірних відповідей: ${correct} / помилок: ${wrong}`}</p>

            {Boolean(checkedWords.length) && Boolean(attempts) &&
                variants.map(({ engWord, id }) => (
                    <button
                        key={id}
                        value={id}
                        onClick={handleVariant}
                        type="button"
                    >
                        {engWord}
                    </button>
                ))}
            {attempts === 0 && (
                <button onClick={handleRefresh} type="button">
                    Ще раз
                </button>
            )}
        </div>
    );
};
