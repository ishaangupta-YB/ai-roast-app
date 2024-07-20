'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";

const Modal = ({ children, onClose }: any) => (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      {children}
    </div>
  </div>
);

export default function HistoryTable() {
  const [histories, setHistories] = useState([]);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchHistories();
    }
  }, [user]);

  const fetchHistories = async () => {
    try {
      const response = await axios.get("/api/history");
      setHistories(response.data);
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  };

  return (
    <div>
      <h1>All Roast Histories</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Roast Tone</TableCell>
            <TableCell>Role Type</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {histories.map((history) => (
            <TableRow key={history.id}>
              <TableCell>
                {new Date(history.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{history.type}</TableCell>
              <TableCell>{history?.username}</TableCell>
              <TableCell>{history.roastTone}</TableCell>
              <TableCell>{history.roleType}</TableCell>
              <TableCell>{history.language}</TableCell>
              <TableCell>
                <button onClick={() => setSelectedHistory(history)}>
                  View
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedHistory && (
        <Modal onClose={() => setSelectedHistory(null)}>
          <h2>History Details</h2>
          <p>
            <strong>Input:</strong> {JSON.stringify(selectedHistory)}
          </p>
          <p>
            <strong>Output:</strong> {selectedHistory.outputData}
          </p>
          <button onClick={() => setSelectedHistory(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
}
