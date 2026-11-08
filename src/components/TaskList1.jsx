import React from 'react';

const PURPLE = '#6c47ff';
const GREY = '#e5e7eb';

const priorityColor = { High: '#e11d48', Medium: '#f5b400', Low: '#16a34a' };

const labelStyle = { fontSize: '0.65rem', color: '#9ca3af', marginBottom: '2px' };

const StatusIndicator = ({ status }) => {
  if (status === 'Done') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="none" stroke={PURPLE} strokeWidth="2" />
      </svg>
    );
  }
  if (status === 'In Progress') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20">
        <circle cx="10" cy="10" r="8" fill="none" stroke={GREY} strokeWidth="2" />
        <path
          d="M10 2 A8 8 0 0 1 10 18"
          fill="none"
          stroke="#f5b400"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 20 20">
      <circle cx="10" cy="10" r="8" fill="none" stroke={GREY} strokeWidth="2" />
    </svg>
  );
};

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const iconBtn = {
  background: 'none',
  border: 'none',
  padding: '4px',
  cursor: 'pointer',
  lineHeight: 1,
};

const TaskList1 = ({ tasks, deleteTask, showEditForm }) => {
  if (tasks.length === 0) {
    return (
      <p style={{ textAlign: 'center', color: '#9ca3af', padding: '32px 0' }}>
        Belum ada task.
      </p>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          style={{
            background: '#fff',
            borderRadius: '14px',
            padding: '14px 18px',
            marginBottom: '12px',
            display: 'grid',
            gridTemplateColumns: '1.6fr 0.9fr 1fr 24px 56px',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
          }}
        >
          <div>
            <div style={labelStyle}>Task</div>
            <div
              style={{
                fontSize: '0.85rem',
                fontWeight: 600,
                wordBreak: 'break-word',
                textDecoration: task.status === 'Done' ? 'line-through' : 'none',
                color: task.status === 'Done' ? '#9ca3af' : '#111827',
              }}
            >
              {task.name}
            </div>
            <div style={{ fontSize: '0.62rem', color: '#9ca3af', marginTop: '2px' }}>
              🕒 {task.createdAt}
            </div>
          </div>

          <div>
            <div style={labelStyle}>Priority</div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: priorityColor[task.priority],
              }}
            >
              {task.priority}
            </div>
          </div>

          <div>
            <span
              style={{
                background: '#f1f1f3',
                border: '1px solid #e5e7eb',
                color: '#4b5563',
                fontSize: '0.65rem',
                padding: '3px 10px',
                borderRadius: '6px',
                whiteSpace: 'nowrap',
                display: 'inline-block',
              }}
            >
              {task.status}
            </span>
          </div>

          <div className="d-flex justify-content-center">
            <StatusIndicator status={task.status} />
          </div>

          <div className="d-flex justify-content-end">
            <button style={iconBtn} title="Edit" onClick={() => showEditForm(task)}>
              <EditIcon />
            </button>
            <button style={iconBtn} title="Delete" onClick={() => deleteTask(task.id)}>
              <TrashIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList1;