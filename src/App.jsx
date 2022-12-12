import React, { useState } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { useForm } from './useForm';
import { toast } from 'react-hot-toast';
import { getRandomChar, getSpecialSymbol } from './utils';

function App() {
    const [values, setValues] = useForm({
        length: 8,
        capital: true,
        small: true,
        number: false,
        symbol: false,
    });

    const [result, setResult] = useState('');

    const fieldsArray = [
        {
            field: values.capital,
            getChar: () => getRandomChar(65, 90),
        },
        {
            field: values.small,
            getChar: () => getRandomChar(97, 122),
        },
        {
            field: values.number,
            getChar: () => getRandomChar(48, 57),
        },
        {
            field: values.symbol,
            getChar: () => getSpecialSymbol(),
        },
    ];

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let generatedPassword = '';
        const checkedFields = fieldsArray.filter(({ field }) => field);

        for (let i = 0; i < values.length; i++) {
            const index = Math.floor(Math.random() * checkedFields.length);
            const letter = checkedFields[index]?.getChar();

            if (letter) {
                generatedPassword += letter;
            }
        }
        if (generatedPassword) {
            setResult(generatedPassword);
        } else {
            toast.error('Не роби нам нерви, вибери най одну галочку');
        }
    };

    const handleClipboard = async () => {
        if (result) {
            await navigator.clipboard.writeText(result);
            toast.success('Пароль скопійовано');
        } else {
            toast.error('Ніц не скопійовано');
        }
    };

    return (
        <section>
            <div className='container'>
                <form id='pg-form' onSubmit={handleOnSubmit}>
                    <div className='result'>
                        <input type='text' id='result' placeholder='Мінімум 8 символів' readOnly value={result} />
                        <div className='clipboard' onClick={handleClipboard}>
                            <FaClipboard />
                        </div>
                    </div>
                    <div>
                        <div className='field'>
                            <label htmlFor='length'>Довжина</label>
                            <input
                                type='number'
                                id='length'
                                min={8}
                                max={25}
                                name='length'
                                value={values.length}
                                onChange={setValues}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='capital'>ВЕРХНІЙ РЕГІСТР</label>
                            <input
                                type='checkbox'
                                id='capital'
                                name='capital'
                                checked={values.capital}
                                onChange={setValues}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='small'>нижній регістр</label>
                            <input
                                type='checkbox'
                                id='small'
                                name='small'
                                checked={values.small}
                                onChange={setValues}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='number'>Число</label>
                            <input
                                type='checkbox'
                                id='number'
                                name='number'
                                checked={values.number}
                                onChange={setValues}
                            />
                        </div>
                        <div className='field'>
                            <label htmlFor='symbol'>Символ</label>
                            <input
                                type='checkbox'
                                id='symbol'
                                name='symbol'
                                checked={values.symbol}
                                onChange={setValues}
                            />
                        </div>
                    </div>
                    <button type='submit'>Згенерувати пароль</button>
                </form>
            </div>
        </section>
    );
}

export default App;
