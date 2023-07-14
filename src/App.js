import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
    const [array, setArray] = useState([]);
    const [disableButtons, setDisableButtons] = useState(false);

    useEffect(() => {
        resetArray();
    }, []);

    const resetArray = () => {
        setDisableButtons(true);

        const array = [];
        for (let i = 0; i < 100; i++) {
            array.push(randomIntFromInterval(5, 500));
        }
        setArray(array);

        // Reset colors of all bars
        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < bars.length; i++) {
            bars[i].style.backgroundColor = 'rgb(73, 73, 202)';
        }

        setDisableButtons(false);
    };

    const bubbleSort = async () => {
        setDisableButtons(true);

        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                bars[j].style.backgroundColor = 'red';
                bars[j + 1].style.backgroundColor = 'red';

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, 40)
                );

                if (array[j] > array[j + 1]) {
                    const temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;

                    bars[j].style.height = `${array[j]}px`;
                    bars[j + 1].style.height = `${array[j + 1]}px`;
                }

                bars[j].style.backgroundColor = 'rgb(73, 73, 202)';
                bars[j + 1].style.backgroundColor = 'blue';
            }
            bars[array.length - i - 1].style.backgroundColor = 'green';
        }
        bars[0].style.backgroundColor = 'green';

        setDisableButtons(false);
    };

    const selectionSort = async () => {
        setDisableButtons(true);

        const bars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < array.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < array.length; j++) {
                bars[j].style.backgroundColor = 'red';
                bars[minIndex].style.backgroundColor = 'red';

                await new Promise((resolve) =>
                    setTimeout(() => {
                        resolve();
                    }, 100)
                );

                if (array[j] < array[minIndex]) {
                    minIndex = j;
                }

                bars[j].style.backgroundColor = 'rgb(73, 73, 202);';
                bars[minIndex].style.backgroundColor = 'rgb(73, 73, 202);';
            }
            const temp = array[minIndex];
            array[minIndex] = array[i];
            array[i] = temp;

            bars[minIndex].style.height = `${array[minIndex]}px`;
            bars[i].style.height = `${array[i]}px`;

            bars[i].style.backgroundColor = 'green';
        }
        bars[array.length - 1].style.backgroundColor = 'green';

        setDisableButtons(false);
    };

    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return (
        <div className="sorting-visualizer">
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{ height: `${value}px` }}
                    ></div>
                ))}
            </div>
            <div className="button-container" style={{ marginTop: "50px" }}>
                <button
                    onClick={() => resetArray()}
                    disabled={disableButtons ? true : false}
                    className="btn btn-primary"
                >
                    Generate New Array
                </button>
                <button
                    onClick={() => bubbleSort()}
                    disabled={disableButtons ? true : false}
                    className="btn btn-danger"
                >
                    Bubble Sort
                </button>
                <button
                    onClick={() => selectionSort()}
                    disabled={disableButtons ? true : false}
                    className="btn btn-warning"
                >
                    Selection Sort
                </button>
            </div>
        </div>
    );
};

export default App;