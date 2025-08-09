import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const languageIdMap = {
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 63,
};

export default function CodeEditor({ testCases = [] }) {
  const [code, setCode] = useState('// Write your code here...');
  const [language, setLanguage] = useState('java');
  const [results, setResults] = useState([]);

  const runCode = async () => {
    const runTest = async (test) => {
      const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        data: {
          language_id: languageIdMap[language],
          source_code: code,
          stdin: test.input,
        },
      };

      const res = await axios.request(options);
      return res.data.stdout?.trim() === test.expectedOutput?.trim();
    };

    const outcomes = await Promise.all(
      testCases.map(async (t) => ({ ...t, passed: await runTest(t) }))
    );
    setResults(outcomes);
  };

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2 font-semibold text-sm">Language:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="javascript">JavaScript</option>
        </select>
      </div>

      <Editor
        height="400px"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={(value) => setCode(value)}
        options={{ minimap: { enabled: false }, fontSize: 14 }}
      />

      <button
        onClick={runCode}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Run Code
      </button>

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Results:</h3>
          <ul className="mt-2">
            {results.map((r, i) => (
              <li key={i} className={`text-sm ${r.passed ? 'text-green-600' : 'text-red-600'}`}>
                Test {i + 1}: {r.passed ? 'Passed' : 'Failed'}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
