import React, { createContext, useContext, useMemo, useState } from "react";

const AssignmentContext = createContext();

function normalizeAssignment(assignment) {
  return {
    id: assignment._id ?? assignment.id,
    title: assignment.title,
    subject: assignment.module ?? assignment.subject,
    deadline: assignment.deadline?.split("T")[0] ?? "",
    note: assignment.shortSummary ?? assignment.note,
    difficulty: assignment.difficulty,
    estimatedTime: assignment.estimatedTime,
    pdfUrl: assignment.pdfUrl,
    owner: assignment.owner,
    completeStatus: Boolean(assignment.completeStatus),
    priority: assignment.priority,
    createdAt: assignment.createdAt,
    updatedAt: assignment.updatedAt,
    completedAt:
      assignment.completedAt ??
      (assignment.completeStatus
        ? assignment.updatedAt?.split("T")[0]
        : undefined),
  };
}

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useState([]);
  const [completedAssignments, setCompletedAssignments] = useState([]);
  const [totalAssingments, setTotalAssingments] = useState(0);
  const [complete, setComplete] = useState(0);

  function replaceAssignments(serverAssignments = []) {
    const normalized = serverAssignments
      .map(normalizeAssignment)
      .filter((item) => item.id);

    setAssignments(normalized.filter((item) => !item.completeStatus));
    setCompletedAssignments(
      normalized.filter((item) => item.completeStatus),
    );
  }

  function addAssignment(newAssignments) {
    const knownIds = new Set(
      [...assignments, ...completedAssignments].map((item) => item.id),
    );
    const items = (Array.isArray(newAssignments)
      ? newAssignments
      : [newAssignments]
    )
      .map(normalizeAssignment)
      .filter((item) => item.id && !knownIds.has(item.id));

    if (!items.length) return;

    const activeItems = items.filter((item) => !item.completeStatus);
    const completedItems = items.filter((item) => item.completeStatus);

    setAssignments((current) => {
      const incomingIds = new Set(activeItems.map((item) => item.id));
      return [...activeItems, ...current.filter((item) => !incomingIds.has(item.id))];
    });
    setCompletedAssignments((current) => {
      const incomingIds = new Set(completedItems.map((item) => item.id));
      return [
        ...completedItems,
        ...current.filter((item) => !incomingIds.has(item.id)),
      ];
    });
    setTotalAssingments((current) => current + items.length);
    setComplete((current) => current + completedItems.length);
  }

  function completeAssignment(id, serverAssignment) {
    const selected = assignments.find((item) => item.id === id);
    if (!selected) return;

    const completed = serverAssignment
      ? normalizeAssignment(serverAssignment)
      : {
          ...selected,
          completeStatus: true,
          completedAt: new Date().toISOString().slice(0, 10),
        };

    setAssignments((current) => current.filter((item) => item.id !== id));
    setCompletedAssignments((history) => [
      completed,
      ...history.filter((item) => item.id !== id),
    ]);
    setComplete((count) => count + 1);
  }

  function deleteAssignment(id) {
    const wasCompleted = completedAssignments.some((item) => item.id === id);
    setAssignments((current) => current.filter((item) => item.id !== id));
    setCompletedAssignments((current) =>
      current.filter((item) => item.id !== id),
    );
    if (wasCompleted) setComplete((count) => Math.max(0, count - 1));
    setTotalAssingments((count) => Math.max(0, count - 1));
  }

  const value = useMemo(
    () => ({
      assignments,
      completedAssignments,
      replaceAssignments,
      addAssignment,
      completeAssignment,
      deleteAssignment,
      totalAssingments,
      setTotalAssingments,
      complete,
      setComplete,
    }),
    [assignments, completedAssignments, totalAssingments, complete],
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
