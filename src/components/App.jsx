// import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import { SharedLayout } from './sharedLayout/SharedLayout';
import { Home } from 'pages/Home';
import { Quiz } from 'pages/Quiz';
import { useDispatch } from 'react-redux';
import { getWords } from 'redux/operations';


// import WordForm from './WordForm/WordForm';
// import WordsList from './WordsList/WordsList';

export const App = () => {
    const dispatch = useDispatch();
    // const [words, setWords] = useLocalStorage('words', []);

    // const addWords = word => {
    //     setWords(prevState => [word, ...prevState]);
    // };


    // const checkWord = (id) => {
    //     setWords(prevState =>
    //         prevState.map(word => {
    //             if (word.id === id) {
    //                 return {...word, checked: !word.checked}
    //             }
    //             return word;
    //         })
    //     );
    // }
    useEffect(() => {
        dispatch(getWords()) 
    }, [dispatch])

    return (
        <>
            <Routes>
                <Route path='/' element={<SharedLayout />}>
                    <Route index element={<Home/>
                    }
                    />
                    <Route path='/quiz' element={<Quiz/>} />
                </Route>
            </Routes> 
        </>
    );
};
