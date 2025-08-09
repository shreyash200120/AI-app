import React, { useEffect, useState } from 'react';
import API from '../api/api';
import CodeEditor from '../components/CodeEditor';

export default function DashboardPage() {
  const [question, setQuestion] = useState('');
  const [testCases, setTestCases] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await API.get('/api/question/arrays');
        setQuestion(res.data.question);
        setTestCases(res.data.testCases);
      } catch {
        alert('Failed to fetch question');
      }
    };
    fetchQuestion();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{question}</h1>
      <CodeEditor testCases={testCases} />
    </div>
  );
}
