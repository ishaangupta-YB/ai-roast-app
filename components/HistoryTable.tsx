"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "./ui/table";

function HistoryTable({ type }: { type: string }) {
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
      const response = await axios.get(`/api/history/${type}`);
      setHistories(response.data);
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
  };
  return  (
    <div>
      <h1>{`${type.charAt(0).toUpperCase() + type.slice(1)} History`}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Input Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {histories.map((history) => (
            <TableRow key={history.id}>
              <TableCell>{new Date(history.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{history.inputType}</TableCell>
              <TableCell>
                <button onClick={() => setSelectedHistory(history)}>View</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedHistory && (
        <Modal onClose={() => setSelectedHistory(null)}>
          <h2>History Details</h2>
          <p><strong>Input:</strong> {selectedHistory.inputData}</p>
          <p><strong>Output:</strong> {selectedHistory.outputData}</p>
          <button onClick={() => setSelectedHistory(null)}>Close</button>
        </Modal> 
      )}
    </div>
  );
}

export default HistoryTable;
