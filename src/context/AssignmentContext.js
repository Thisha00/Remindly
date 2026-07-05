import React, { createContext, useContext, useMemo, useState } from "react";

const AssignmentContext = createContext();

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [totalAssingments, setTotalAssingments] = useState(0);
  const [complete, setComplete] = useState(0);

  function addAssignment(assignments) {
    const items = Array.isArray(assignments) ? assignments : [assignments];

    setAssignments((current) => {
      const existingIds = new Set(current.map((item) => item.id));

      const newItems = items
        .filter((item) => !existingIds.has(item._id))
        .map((assignment) => ({
          id: assignment._id,
          title: assignment.title,
          subject: assignment.module,
          deadline: assignment.deadline?.split("T")[0] ?? "",
          note: assignment.shortSummary,
          difficulty: assignment.difficulty,
          estimatedTime: assignment.estimatedTime,
          pdfUrl: assignment.pdfUrl,
          owner: assignment.owner,
          completeStatus: assignment.completeStatus,
          priority: assignment.priority,
          createdAt: assignment.createdAt,
        }));
      console.log("current", current);
      console.log("new", newItems);
      return [...newItems, ...current];
    });
  }

  function completeAssignment(id) {
    const selected = assignments.find((item) => item.id === id);
    if (!selected) return;
    setAssignments((current) => current.filter((item) => item.id !== id));
    setCompletedAssignments((current) => [
      { ...selected, completedAt: new Date().toISOString().slice(0, 10) },
      ...current,
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
      deleteAssignment,
      totalAssingments,
      setTotalAssingments,
      complete,
      setComplete,
    }),
    [assignments, completedAssignments],
  );

  return (
    <AssignmentContext.Provider value={value}>
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignments() {
  return useContext(AssignmentContext);
}
