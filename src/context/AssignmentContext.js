import React, { createContext, useContext, useMemo, useState } from "react";

const AssignmentContext = createContext();

const starterAssignments = [
  {
    id: "1",
    title: "Database Normalization",
    subject: "Database Management",
    deadline: "2026-09-15",
    note: "Design and normalize a database schema for a student registration system.",
    priority: "Urgent",
    difficulty: "Medium",
    fileName: ""
  },
  {
    id: "2",
    title: "Python Microservices",
    subject: "Software Architecture",
    deadline: "2026-09-18",
    note: "Prepare service endpoints and documentation.",
    priority: "Normal",
    difficulty: "Hard",
    fileName: ""
  },
  {
    id: "3",
    title: "RESTful API Design",
    subject: "Web Development",
    deadline: "2026-09-23",
    note: "Create a clean API proposal with sample JSON responses.",
    priority: "Low",
    difficulty: "Easy",
    fileName: ""
  }
];

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useState(starterAssignments);
  const [completedAssignments, setCompletedAssignments] = useState([]);

  function addAssignment(assignment) {
    setAssignments((current) => [
      {
        id: Date.now().toString(),
        deadline: new Date().toISOString().slice(0, 10),
        priority: "Normal",
        difficulty: "Medium",
        ...assignment
      },
      ...current
    ]);
  }

  function completeAssignment(id) {
    const selected = assignments.find((item) => item.id === id);
    if (!selected) return;
    setAssignments((current) => current.filter((item) => item.id !== id));
    setCompletedAssignments((current) => [
      { ...selected, completedAt: new Date().toISOString().slice(0, 10) },
      ...current
    ]);
  }

  function deleteAssignment(id) {
    setAssignments((current) => current.filter((item) => item.id !== id));
  }

  const value = useMemo(
    () => ({
      assignments,
      completedAssignments,
      addAssignment,
      completeAssignment,
      deleteAssignment
    }),
    [assignments, completedAssignments]
  );

  return <AssignmentContext.Provider value={value}>{children}</AssignmentContext.Provider>;
}

export function useAssignments() {
  return useContext(AssignmentContext);
}
