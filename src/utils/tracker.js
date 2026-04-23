/**
 * tracker.js
 * Mock task tracking system using localStorage (adapted from Flow.md)
 */

const TRACKER_KEY = 'mitrflow_task_tracker';
const JOBS_KEY = 'mitrflow_print_jobs';

export const tracker = {
  // --- Task Tracking ---
  getTasks: () => {
    try {
      const data = localStorage.getItem(TRACKER_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  isDone: (taskName, referenceId = null) => {
    const tasks = tracker.getTasks();
    return tasks.some(t => t.name === taskName && t.referenceId === referenceId && t.status === 'done');
  },

  markDone: (taskName, referenceId = null) => {
    const tasks = tracker.getTasks();
    tasks.push({
      id: Date.now().toString(),
      name: taskName,
      referenceId: referenceId,
      status: 'done',
      created_at: new Date().toISOString()
    });
    localStorage.setItem(TRACKER_KEY, JSON.stringify(tasks));
  },

  // --- Print Job Tracking (Order Flow) ---
  getPrintJobs: () => {
    try {
      const data = localStorage.getItem(JOBS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  createPrintJob: (jobData) => {
    const jobs = tracker.getPrintJobs();
    const newJob = {
      id: `PJ-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      ...jobData,
      status: 'WAIT FOR PRINT', // WAIT FOR PRINT, PRINTING, DONE
      createdAt: new Date().toISOString()
    };
    jobs.push(newJob);
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
    return newJob;
  },

  updatePrintJobStatus: (id, status) => {
    const jobs = tracker.getPrintJobs();
    const index = jobs.findIndex(j => j.id === id);
    if (index !== -1) {
      jobs[index].status = status;
      localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
    }
  },

  deletePrintJob: (id) => {
    const jobs = tracker.getPrintJobs();
    const filtered = jobs.filter(j => j.id !== id);
    localStorage.setItem(JOBS_KEY, JSON.stringify(filtered));
  }
};
