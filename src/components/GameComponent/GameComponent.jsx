import { Button, TextField } from '@mui/material';
import { Container } from '@mui/system';
import shuffle from 'lodash.shuffle';
import { nanoid } from 'nanoid';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkWord } from 'redux/operations';
import { selectCheckedsWords } from 'redux/selectors';

export default function GameComponent({setKey, props}) {
    const words = useSelector(selectCheckedsWords);
    const dispatch = useDispatch();
    const randomWord = useMemo(() => {
        return shuffle(words)[0];
    }, [words]);
    const maxWords = useMemo(() => {
        return words.length;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const [answer, setAnswer] = useState('');
    const [corectAnswer, setCorectAnswer] = useState(0);
    const handleChange = event => {
        setAnswer(event.target.value);
    };
    

    const checkAnswer = event => {
        event.preventDefault();
        dispatch(
            checkWord({
                id: randomWord.id,
                checked: false,
            })
        );

        if (randomWord.engWord === answer) {
            setCorectAnswer(prevState => prevState + 1);
        }
        setAnswer('');
    };

    const [testCounter, setTestCounter] = useState(0);

    useEffect(() => {
        console.log("hello world")
        console.log(testCounter);
        return () => {
            console.log('unMountd')
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
        setTestCounter(prevState => prevState + 1);
        setKey(nanoid(5))
        console.log(props);
    };

    if (!maxWords) {
        return (
            <>
                <h2>check some words in your vocabruara</h2>
                <button onClick={handleClick}>click me</button>
            </>
        );
    }
    return (
        <Container
            display="flex"
            maxWidth="xl"
            sx={{
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                flexDirection: 'column',
            }}
        >
            {!randomWord ? (
                <h2>
                    your result is {corectAnswer}/{maxWords}
                </h2>
            ) : (
                <>
                    <h1 style={{ textAlign: 'center', color: 'blue' }}>
                        {randomWord?.ukrWord}
                    </h1>
                    <h2>
                        {corectAnswer}/{maxWords}
                    </h2>
                    <form
                        style={{
                            height: 'auto',
                            width: '320px',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onSubmit={checkAnswer}
                    >
                        <TextField
                            value={answer}
                            onChange={handleChange}
                            variant="outlined"
                            label="answer"
                        />
                        <Button
                            variant="contained"
                            type="submit"
                            style={{ maxWidth: '140px', margin: '20px auto 0' }}
                        >
                            Перевірити
                        </Button>
                    </form>{' '}
                </>
            )}
        </Container>
    );
}
