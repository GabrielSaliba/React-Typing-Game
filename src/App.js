import React, { useEffect, useRef, useState } from 'react';
import wordsList from "./resources/words.json";

const MAX_TYPED_KEYS = 35;

const getWord = () => {
  const index = Math.floor(Math.random() * wordsList.length);
  const word = wordsList[index];
  return word.toLowerCase();
}

const Word = ({ word, validkeys }) => {
  if (!word)
    return null;

  const joinedKeys = validkeys.join('');
  const matched = word.slice(0, joinedKeys.length);
  const remainder = word.slice(joinedKeys.length);

  const matchedClass = (joinedKeys === word) ? "matched completed" : "matched";

  return (
    <>
      <span className={matchedClass}>{matched}</span>
      <span className="remainder">{remainder}</span>
    </>
  )
}

const isValidKey = (key, word) => {
  if (!word) return false;
  const result = word.split('').includes(key)
  return result;
}

const App = () => {

  const [typedKeys, setTypedKeys] = useState([]);
  const [validKeys, setValidKeys] = useState([]);
  const [completedWords, setCompletedWords] = useState([]);
  const [word, setWord] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {
    setWord(getWord())
    if (containerRef) {
      containerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let timeout = null;
    const wordFromValidKeys = validKeys.join("").toLowerCase();

    if (word && word === wordFromValidKeys) {
      timeout = setTimeout(() => {
        let newWord = null;
        do {
          newWord = getWord();
        } while (completedWords.includes(newWord));

        setWord(newWord);
        setValidKeys([]);
        setCompletedWords(prev => [...prev, word]);
      }, 500);
    }
    return () => {
      if (timeout)
        clearTimeout(timeout);
    }
  }, [word, validKeys, completedWords]);

  const handleKeyDown = (e) => {
    e.preventDefault();
    const { key } = e;
    setTypedKeys((prev) => [...prev, key].slice(MAX_TYPED_KEYS * -1))

    if (isValidKey(key, word)) {
      setValidKeys((prev) => {
        const isValidLength = prev.length <= word.length;
        const isNextChar = isValidLength && word[prev.length] === key;
        return isNextChar ? [...prev, key] : prev;
      })
    }
  };

  return (
    <div className="container" tabIndex="0" onKeyDown={handleKeyDown} ref={containerRef}>
      <div className="valid-keys">
        <Word word={word} validkeys={validKeys} />
      </div>

      <div className="typed-keys">
        {typedKeys ? typedKeys.join("") : null}
      </div>
      <div className="completed-words">
        <ol>
          {completedWords.map((word) => (<li key={word}>{word}</li>))}
        </ol>
      </div>
    </div>
  );
}

export default App;