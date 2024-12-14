import React, { useRef, useEffect, useState } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TaskTable.css";

const TaskTable = ({ tasks, updateTask, deleteTask }) => {
    const tableRef = useRef(null);
    const [tableInstance, setTableInstance] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [taskCounters, setTaskCounters] = useState({
        total: 0,
        toDo: 0,
        inProgress: 0,
        done: 0,
    });

    // Initialize table
    useEffect(() => {
        const table = new Tabulator(tableRef.current, {
            data: tasks || [],
            layout: "fitColumns",
            columns: [
                { title: "ID", field: "id", width: 50, align: "center" },
                { title: "Title", field: "title", editor: "input" },
                { title: "Description", field: "description", editor: "input" },
                {
                    title: "Status",
                    field: "status",
                    editor: "select",
                    editorParams: { values: ["To Do", "In Progress", "Done"] },
                },
                {
                    title: "Actions",
                    formatter: (cell) => `
                        <button class="edit-btn">✏️</button>
                        <button class="delete-btn">❌</button>
                    `,
                    width: 120,
                    align: "center",
                    cellClick: (e, cell) => {
                        if (e.target.classList.contains("edit-btn")) {
                            console.log("Edit clicked for:", cell.getData());
                        }
                        if (e.target.classList.contains("delete-btn")) {
                            deleteTask(cell.getData().id);
                        }
                    },
                },
            ],
            cellEdited: (cell) => updateTask(cell.getData()),
        });

        setTableInstance(table);

        return () => table.destroy();
    }, [tasks, updateTask, deleteTask]);

    // Update search results with debouncing
    useEffect(() => {
        const timer = setTimeout(() => {
            if (tableInstance) {
                tableInstance.setFilter([
                    [
                        { field: "title", type: "like", value: searchTerm },
                        { field: "description", type: "like", value: searchTerm },
                    ],
                ]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, tableInstance]);

    // Update task counters
    useEffect(() => {
        const total = tasks.length;
        const toDo = tasks.filter((task) => task.status === "To Do").length;
        const inProgress = tasks.filter((task) => task.status === "In Progress").length;
        const done = tasks.filter((task) => task.status === "Done").length;

        setTaskCounters({ total, toDo, inProgress, done });
    }, [tasks]);

    return (
        <div className="task-container">
            <div className="task-header">
                <div className="task-counters">
                    <div className="task-counter">
                        <div>Total: </div>
                        <div>{taskCounters.total}</div>
                    </div>
                    <div className="task-counter">
                        <div>To Do: </div>
                        <div>{taskCounters.toDo}</div>
                    </div>
                    <div className="task-counter">
                        <div>In Progress: </div>
                        <div>{taskCounters.inProgress}</div>
                    </div>
                    <div className="task-counter">
                        <div>Done: </div>
                        <div>{taskCounters.done}</div>
                    </div>
                </div>
            </div>
            <div className="search-div">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-box"
                />
            </div>
            <div ref={tableRef} className="task-table"></div>
        </div>
    );
};

export default TaskTable;
