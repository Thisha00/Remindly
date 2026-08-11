import React, { createContext, useContext, useMemo, useState } from "react";

const AssignmentContext = createContext();

export function normalizeAssignment(assignment) {
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
    const items = (Array.isArray(newAssignments)
      ? newAssignments
      : [newAssignments]
    )
      .map(normalizeAssignment)
      .filter((item) => item.id);

    if (!items.length) return;

    const existingById = new Map(
      [...assignments, ...completedAssignments].map((item) => [item.id, item]),
    );
    const activeItems = items.filter((item) => !item.completeStatus);
    const completedItems = items.filter((item) => item.completeStatus);
    const incomingIds = new Set(items.map((item) => item.id));
    const newItemCount = items.filter((item) => !existingById.has(item.id)).length;
    const completedCountChange = items.reduce((change, item) => {
      const existing = existingById.get(item.id);
      return (
        change +
        Number(Boolean(item.completeStatus)) -
        Number(Boolean(existing?.completeStatus))
      );
    }, 0);

    setAssignments((current) => {
      return [...activeItems, ...current.filter((item) => !incomingIds.has(item.id))];
    });
    setCompletedAssignments((current) => {
      return [
        ...completedItems,
        ...current.filter((item) => !incomingIds.has(item.id)),
      ];
    });
    setTotalAssingments((current) => current + newItemCount);
    setComplete((current) => Math.max(0, current + completedCountChange));
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
