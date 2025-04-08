// Install additional deps: npm install axios

"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [projectData, setProjectData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Fetch from Google Sheets for chart data
  useEffect(() => {
    async function fetchSheetData() {
      try {
        const sheetId = "898993110";
        const apiKey = "16B07GDiW0Obk1sKBv5Bc01UOglYPi-fYZosaShtyKac";
        const range = "Sheet1!A2:B"; // Adjust range as needed

        const response = await axios.get(
          `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`
        );

        const rows = response.data.values || [];
        const labels = rows.map((row) => row[0]);
        const data = rows.map((row) => parseInt(row[1]));

        setChartData({
          labels,
          datasets: [
            {
              label: 'Burndown (CHF)',
              data,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 2,
            },
          ],
        });
      } catch (err) {
        console.error("Google Sheets fetch error:", err);
      }
    }

    fetchSheetData();
  }, []);

  // Fetch tasks from Notion
  //Goals tracker https://www.notion.so/saynode/1cfbe41584df807c865ccf23408a8fcf?v=1cfbe41584df80d1bdfb000cb93a2bb5
  useEffect(() => {
    async function fetchNotionTasks() {
      try {
        const notionDbId = "1cfbe41584df807c865ccf23408a8fcf";
        const notionToken = "secret_d8puhSAHrj7FZcL3iMMXtwGUPapuYRz1W2sj1irS61r";

        const response = await axios.post(
          `https://api.notion.com/v1/databases/${notionDbId}/query`,
          {},
          {
            headers: {
              "Authorization": `Bearer ${notionToken}`,
              "Notion-Version": "2022-06-28",
              "Content-Type": "application/json"
            }
          }
        );

        const results = response.data.results;
        const formatted = results.map(item => ({
          id: item.id,
          title: item.properties.Name.title[0]?.plain_text || "Untitled"
        }));

        setTasks(formatted);
      } catch (err) {
        console.error("Notion fetch error:", err);
      }
    }

    fetchNotionTasks();
  }, []);

  // Placeholder project data (static or from Notion)
  useEffect(() => {
    setProjectData([
      { name: 'General', budget: 100000, status: 'In Development', people: 5, link: '#' },
      { name: 'Business Development', budget: 80000, status: 'Completed', people: 3, link: '#' },
    ]);
  }, []);

  const goalsComponent = (
    <div style={{ padding: 20 }}>
      <h2 style={{ marginBottom: 10 }}>📌 Daily Goals from Notion</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <input type="checkbox" /> {task.title}
          </li>
        ))}
      </ul>
    </div>
  );

  const projectTable = (
    <div style={{ padding: 20 }}>
      <h2>Project Overview</h2>
      <table>
        <thead>
          <tr>
            <th>Project</th><th>Budget</th><th>Status</th><th>People</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((p, i) => (
            <tr key={i}>
              <td>{p.name}</td><td>{p.budget}</td><td>{p.status}</td><td>{p.people}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Bar data={chartData} />
    </div>
  );

  const dashboardComponent = (
    <div style={{ padding: 20 }}>
      <h2>📊 Burndown Chart from Google Sheets</h2>
      <Line data={chartData} />
    </div>
  );

  return (
    <div style={{ padding: 20, backgroundColor: '#222', color: 'white' }}>
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('projects')}>Projects</button>
        <button onClick={() => setActiveTab('goals')}>Goals</button>
      </div>

      {activeTab === 'dashboard' && dashboardComponent}
      {activeTab === 'projects' && projectTable}
      {activeTab === 'goals' && goalsComponent}
    </div>
  );
}
