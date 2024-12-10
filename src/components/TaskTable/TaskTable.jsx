import React, { useRef, useEffect } from "react";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import "tabulator-tables/dist/css/tabulator.min.css";
import "./TaskTable.css"

const TaskTable = ({ tasks, updateTask, deleteTask }) => {
    const tableRef = useRef(null);

    useEffect(() => {
        const table = new Tabulator(tableRef.current, {
            data: tasks,
            layout: "fitColumns",
            columns: [
                { title: "ID", field: "id", width: 50 },
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
                    formatter: "buttonCross",
                    width: 100,
                    align: "center",
                    cellClick: (e, cell) => deleteTask(cell.getData().id),
                },
            ],
            cellEdited: (cell) => {
                updateTask(cell.getData());
            },
        });

        return () => table.destroy();
    }, [tasks, updateTask, deleteTask]);

    return <div ref={tableRef} className="task-table"></div>;
};

export default TaskTable;