import { useState } from 'react';
import TextField from '@mui/material/TextField';
import { deleteWord, editWord, checkWord } from 'redux/operations';
import { useDispatch } from 'react-redux';

const WordsListItem = ({
    id,
    ukrWord,
    engWord,
    itemNumber,
    checked,
}) => {
    const [isEdit, setIsEdit] = useState(false);
    const [editUkrWord, setEditUkrWord] = useState(ukrWord);
    const [editEngWord, setEditEngWord] = useState(engWord);
    const dispatch = useDispatch();

    const handleDeleteWord = () => {
        dispatch(deleteWord(id))
    };

    const handleCheckWord = () => {
        dispatch(checkWord({
            id,
            checked: !checked,
        }))
    }

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
            case 'ukrWord':
                setEditUkrWord(value);
                break;
            case 'engWord':
                setEditEngWord(value);
                break;
            default:
                break;
        }
    };

    const edit = () => {
        setIsEdit(prevState => !prevState);
        if (isEdit) {
            const word = {
                id,
                ukrWord: editUkrWord,
                engWord: editEngWord,
            };
            dispatch(editWord(word))
        }
    };

    return (
        <>
            <li>
                <p>number: {itemNumber}</p>
                <label>
                    на вивчення
                    <input type="checkbox" onChange={handleCheckWord} checked={checked} />
                </label>
                {isEdit ? (
                    <>
                        <TextField
                            label="ukrainian"
                            variant="outlined"
                            type="text"
                            value={editUkrWord}
                            name="ukrWord"
                            onChange={handleChange}
                        />
                        <TextField
                            label="english"
                            variant="outlined"
                            type="text"
                            value={editEngWord}
                            name="engWord"
                            onChange={handleChange}
                        />
                    </>
                ) : (
                    <>
                        <p>українська: {ukrWord}</p>
                        <p>англійська: {engWord}</p>{' '}
                    </>
                )}
                <button type="button" onClick={handleDeleteWord}>
                    Delete
                </button>
                <button type="button" onClick={edit}>
                    Edit
                </button>
            </li>
        </>
    );
};
export default WordsListItem;
