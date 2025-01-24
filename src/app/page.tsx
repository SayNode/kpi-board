// Install dependencies: npm install chart.js react-chartjs-2

"use client";

import { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const projectData = [
    { name: 'General', budget: 100000, status: 'In Development', people: 5, link: '#' },
    { name: 'Business Development', budget: 80000, status: 'Completed', people: 3, link: '#' },
    { name: 'Accounting', budget: 50000, status: 'In Development', people: 2, link: '#' },
    { name: 'HR Recruitment', budget: 60000, status: 'Planning', people: 4, link: '#' },
  ];

  const chartData = {
    labels: projectData.map((project) => project.name),
    datasets: [
      {
        label: 'Budget (CHF)',
        data: projectData.map((project) => project.budget),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const projectTable = (
    <div style={{ backgroundColor: '#444', padding: '20px', borderRadius: '10px', color: '#fff' }}>
      <h2 style={{ marginBottom: '20px' }}>Project Overview</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', color: '#fff' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #555', padding: '10px' }}>Project Name</th>
            <th style={{ borderBottom: '1px solid #555', padding: '10px' }}>Budget (CHF)</th>
            <th style={{ borderBottom: '1px solid #555', padding: '10px' }}>Status</th>
            <th style={{ borderBottom: '1px solid #555', padding: '10px' }}>People</th>
            <th style={{ borderBottom: '1px solid #555', padding: '10px' }}>More Info</th>
          </tr>
        </thead>
        <tbody>
          {projectData.map((project, index) => (
            <tr key={index}>
              <td style={{ borderBottom: '1px solid #555', padding: '10px' }}>{project.name}</td>
              <td style={{ borderBottom: '1px solid #555', padding: '10px' }}>{project.budget}</td>
              <td style={{ borderBottom: '1px solid #555', padding: '10px' }}>{project.status}</td>
              <td style={{ borderBottom: '1px solid #555', padding: '10px' }}>{project.people}</td>
              <td style={{ borderBottom: '1px solid #555', padding: '10px' }}>
                <a href={project.link} style={{ color: '#61dafb' }}>Details</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <Bar
          data={chartData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: 'white',
                },
              },
            },
            scales: {
              x: {
                ticks: { color: 'white' },
              },
              y: {
                ticks: { color: 'white' },
              },
            },
          }}
        />
      </div>
    </div>
  );

  const dashboardComponent = (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ fontSize: '2rem' }}>
          <span role="img" aria-label="heart">❤️❤️❤️❤️</span>
        </div>
        <h1 style={{ margin: '10px 0' }}>Runaway is 4 Months</h1>
      </div>

      <div style={{ backgroundColor: '#444', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
        <h2>🔥 Burn rate</h2>
        <p>month: <strong>120000 CHF</strong></p>
        <p>day: <strong>4000 CHF</strong></p>
        <p>hour: <strong>500 CHF</strong></p>
      </div>

      <div style={{ backgroundColor: '#444', padding: '20px', borderRadius: '10px' }}>
        <Line data={chartData} options={{
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
          },
          scales: {
            x: {
              ticks: { color: 'white' },
            },
            y: {
              ticks: { color: 'white' },
            },
          },
        }} />
      </div>
    </div>
  );

  const goalsComponent = (
  <div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
      <div style={{ backgroundColor: '#FFDDC1', padding: '20px', borderRadius: '10px', color: '#000' }}>
        <h2>📌 Daily Goals</h2>
        <ul>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i}><input type="checkbox" />  Task {i + 1}</li>
          ))}
        </ul>
      </div>
      <div style={{ backgroundColor: '#C1FFD7', padding: '20px', borderRadius: '10px', color: '#000' }}>
        <h2>✈️ Travel</h2>
        <ul>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i}><input type="checkbox" /> Weekly Task {i + 1}</li>
          ))}
        </ul>
      </div>
      <div style={{ backgroundColor: '#FFC1F1', padding: '20px', borderRadius: '10px', color: '#000' }}>
        <h2>⏰ Reminders</h2>
        <ul>
          {Array.from({ length: 10 }, (_, i) => (
            <li key={i}><input type="checkbox" /> Monthly Task {i + 1}</li>
          ))}
        </ul>
      </div>
      <div style={{ backgroundColor: '#C1E1FF', padding: '20px', borderRadius: '10px', color: '#000' }}>
        <h2>🗓️ Weekly Goals</h2>
        <ul>
          {['Setup meeting with Micheal Saylor', 'Apply to European funds', 'Release Legacy Update'].map((goal, i) => (
            <li key={i}><input type="checkbox" defaultChecked /> {goal}</li>
          ))}
        </ul>
      </div>
    </div>
    {/* Additional components for Daily and Monthly Goals */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '20px' }}>
      <div style={{ backgroundColor: '#FFE4C1', padding: '20px', borderRadius: '10px', color: '#000' }}>
        <h2>🌞 Personal Goals</h2>
        <ul>
          {['Morning Exercise', 'Review project updates', 'Prepare lunch', 'Read a chapter from a book'].map((goal, i) => (
            <li key={i}><input type="checkbox" /> {goal}</li>
          ))}
        </ul>
      </div>
      <div style={{ backgroundColor: '#C1D4FF', padding: '20px', borderRadius: '10px', color: '#000' }}>
        <h2>📅 Reminders Goals</h2>
        <ul>
          {['Complete fitness challenge', 'Finish quarterly report', 'Plan next vacation', 'Learn a new skill'].map((goal, i) => (
            <li key={i}><input type="checkbox" /> {goal}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);


  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#333', color: '#fff', height: '100vh', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('dashboard')}
          style={{ backgroundColor: activeTab === 'dashboard' ? '#555' : '#444', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('projects')}
          style={{ backgroundColor: activeTab === 'projects' ? '#555' : '#444', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Projects
        </button>
        <button
          onClick={() => setActiveTab('goals')}
          style={{ backgroundColor: activeTab === 'goals' ? '#555' : '#444', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Goals
        </button>
      </div>

      {activeTab === 'dashboard' && dashboardComponent}
      {activeTab === 'projects' && projectTable}
      {activeTab === 'goals' && goalsComponent}
    </div>
  );
}
