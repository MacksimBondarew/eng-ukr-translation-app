import { useState } from 'react';
import { QuizComponent } from 'components/QuizComponent/QuizComponent';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector } from 'react-redux';
import { selectWords } from 'redux/selectors';


export const Quiz = () => {
    const [start, setStart] = useState(false);
    const [attempts, setAttempts] = useState(1);

    const words = useSelector(selectWords);
    const checkedWords = words.filter(word => word.checked);

    const handleStartQuiz = () => {
        setStart(prevState => !prevState);
    };

    return (
        <div>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={attempts}
                label="Attempts"
                onChange={(e) => setAttempts(Number(e.target.value))}
            >
                {checkedWords.map((word, index) => <MenuItem key={word.id} value={index + 1}>{index + 1}</MenuItem>)}
            </Select>
            {!start ? (
                <button onClick={handleStartQuiz}>Start quiz</button>
            ) : (
                <button onClick={handleStartQuiz}>Stop quiz</button>
            )}
            {start && <QuizComponent attemptsQuantity={attempts} />}
        </div>
    );
};
