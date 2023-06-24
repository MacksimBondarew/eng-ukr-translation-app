import { useState } from 'react';
import { QuizComponent } from 'components/QuizComponent/QuizComponent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { selectWords } from 'redux/selectors';
import GameComponent from 'components/GameComponent/GameComponent';

export const Quiz = () => {
    const [key , setKey] = useState('someKey');
    const [start, setStart] = useState(false);
    const [startGame, setStartGame] = useState(false);
    const [attempts, setAttempts] = useState(1);

    const words = useSelector(selectWords);
    const checkedWords = words.filter(word => word.checked);

    const handleStartQuiz = () => {
        setStart(prevState => !prevState);
        if (startGame) {
            setStartGame(prevState => !prevState);
        }
    };
    const handleStartGame = () => {
        setStartGame(prevState => !prevState);
        if (start) {
            setStart(prevState => !prevState);
        }
    };

    return (
        <div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={attempts}
                label="Attempts"
                onChange={e => setAttempts(Number(e.target.value))}
            >
                {checkedWords.map((word, index) => (
                    <MenuItem key={word.id} value={index + 1}>
                        {index + 1}
                    </MenuItem>
                ))}
            </Select>
            <button onClick={handleStartQuiz}>
                {start ? 'stop' : 'start'} quiz one
            </button>
            <button onClick={handleStartGame}>
                {startGame ? 'stop' : 'start'} quiz second
            </button>

            {start && <QuizComponent attemptsQuantity={attempts} />}
            {startGame && <GameComponent key={key} setKey={setKey} />}
        </div>
    );
};
