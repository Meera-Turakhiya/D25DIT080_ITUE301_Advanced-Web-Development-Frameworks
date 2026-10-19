import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Toast from "../components/Toast";
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api";

function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");

    const [creating, setCreating] = useState(false);
    const [createError, setCreateError] = useState("");

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editPriority, setEditPriority] = useState("medium");

    const [actionLoading, setActionLoading] = useState(null);

    const [toast, setToast] = useState({
        message: "",
        type: ""
    });

    const showToast = (message, type) => {
        setToast({
            message,
            type
        });

        setTimeout(() => {
            setToast({
                message: "",
                type: ""
            });
        }, 3000);
    };

    const fetchTasks = () => {
        setLoading(true);
        setError(null);

        getTasks()
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to fetch tasks.");
                }

                return response.json();
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setCreateError("Task title is required.");
            showToast("Task title is required.", "error");
            return;
        }

        setCreating(true);
        setCreateError("");

        const tempId = `temp-${Date.now()}`;

        const newTask = {
            _id: tempId,
            title: title.trim(),
            description: description.trim(),
            priority,
            completed: false
        };

        setTasks((prevTasks) => [
            newTask,
            ...prevTasks
        ]);

        setTitle("");
        setDescription("");
        setPriority("medium");

        createTask({
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Unable to create task.");
                }

                return response.json();
            })
            .then((data) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === tempId
                            ? data
                            : task
                    )
                );

                showToast(
                    "Task added successfully.",
                    "success"
                );
            })
            .catch((err) => {
                setTasks((prevTasks) =>
                    prevTasks.filter(
                        (task) => task._id !== tempId
                    )
                );

                setCreateError(err.message);

                showToast(
                    "Failed to add task.",
                    "error"
                );
            })
            .finally(() => {
                setCreating(false);
            });
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (!confirmed) {
            return;
        }

        setActionLoading(id);

        deleteTask(id)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Unable to delete task."
                    );
                }

                setTasks((prevTasks) =>
                    prevTasks.filter(
                        (task) => task._id !== id
                    )
                );

                showToast(
                    "Task deleted successfully.",
                    "success"
                );
            })
            .catch(() => {
                showToast(
                    "Failed to delete task.",
                    "error"
                );
            })
            .finally(() => {
                setActionLoading(null);
            });
    };

    const startEdit = (task) => {
        setEditingId(task._id);
        setEditTitle(task.title);
        setEditDescription(
            task.description || ""
        );
        setEditPriority(
            task.priority || "medium"
        );
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditTitle("");
        setEditDescription("");
        setEditPriority("medium");
    };

    const handleUpdate = (id) => {
        if (!editTitle.trim()) {
            showToast(
                "Task title is required.",
                "error"
            );
            return;
        }

        setActionLoading(id);

        const updatedTask = {
            title: editTitle.trim(),
            description: editDescription.trim(),
            priority: editPriority
        };

        updateTask(id, updatedTask)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        "Unable to update task."
                    );
                }

                return response.json();
            })
            .then((data) => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task._id === id
                            ? data
                            : task
                    )
                );

                cancelEdit();

                showToast(
                    "Task updated successfully.",
                    "success"
                );
            })
            .catch(() => {
                showToast(
                    "Failed to update task.",
                    "error"
                );
            })
            .finally(() => {
                setActionLoading(null);
            });
    };

    const handleAddAgain = (task) => {
        setTitle(task.title);
        setDescription(
            task.description || ""
        );
        setPriority(
            task.priority || "medium"
        );

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return (
            <div className="projects">
                <ErrorMessage message={error} />

                <button onClick={fetchTasks}>
                    Retry
                </button>
            </div>
        );
    }

    const filteredTasks = tasks.filter((task) =>
        task.title
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <section className="projects">

            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() =>
                    setToast({
                        message: "",
                        type: ""
                    })
                }
            />

            <h1>Task Management</h1>

            <form
                className="task-form"
                onSubmit={handleCreateTask}
            >

                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) =>
                        setTitle(e.target.value)
                    }
                />

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <select
                    value={priority}
                    onChange={(e) =>
                        setPriority(
                            e.target.value
                        )
                    }
                >
                    <option value="low">
                        Low
                    </option>

                    <option value="medium">
                        Medium
                    </option>

                    <option value="high">
                        High
                    </option>
                </select>

                <button
                    className="add-task-btn"
                    type="submit"
                    disabled={creating}
                >
                    {creating
                        ? "Adding..."
                        : "+ Add Task"}
                </button>

            </form>

            {createError && (
                <p className="form-error">
                    {createError}
                </p>
            )}

            <div className="task-search">

                <input
                    type="text"
                    placeholder="Search Task..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

            </div>

            <div className="task-list">

                {filteredTasks.length === 0 ? (

                    <p className="no-tasks">
                        No tasks found.
                    </p>

                ) : (

                    filteredTasks.map((task) => (

                        <div
                            className="task-card"
                            key={task._id}
                        >

                            {editingId === task._id ? (

                                <div className="edit-area">

                                    <input
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <input
                                        value={
                                            editDescription
                                        }
                                        onChange={(e) =>
                                            setEditDescription(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <select
                                        value={
                                            editPriority
                                        }
                                        onChange={(e) =>
                                            setEditPriority(
                                                e.target.value
                                            )
                                        }
                                    >

                                        <option value="low">
                                            Low
                                        </option>

                                        <option value="medium">
                                            Medium
                                        </option>

                                        <option value="high">
                                            High
                                        </option>

                                    </select>

                                    <div className="edit-buttons">

                                        <button
                                            className="save-btn"
                                            onClick={() =>
                                                handleUpdate(
                                                    task._id
                                                )
                                            }
                                            disabled={
                                                actionLoading ===
                                                task._id
                                            }
                                        >
                                            Save
                                        </button>

                                        <button
                                            className="cancel-btn"
                                            onClick={
                                                cancelEdit
                                            }
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>

                            ) : (

                                <>

                                    <div className="task-info">

                                        <h3>
                                            {task.title}
                                        </h3>

                                        <p>
                                            {task.description ||
                                                "No description available."}
                                        </p>

                                    </div>

                                    <div className="task-status">

                                        <div>

                                            <span>
                                                Priority
                                            </span>

                                            <strong
                                                className={`priority ${
                                                    task.priority ||
                                                    "medium"
                                                }`}
                                            >
                                                {task.priority ||
                                                    "medium"}
                                            </strong>

                                        </div>

                                        <div>

                                            <span>
                                                Status
                                            </span>

                                            <strong className="status">
                                                {task.completed
                                                    ? "Completed"
                                                    : "Pending"}
                                            </strong>

                                        </div>

                                    </div>

                                    <div className="task-actions">

                                        <button
                                            className="add-action"
                                            onClick={() =>
                                                handleAddAgain(
                                                    task
                                                )
                                            }
                                        >
                                            + Add
                                        </button>

                                        <button
                                            className="delete-action"
                                            onClick={() =>
                                                handleDelete(
                                                    task._id
                                                )
                                            }
                                            disabled={
                                                actionLoading ===
                                                task._id
                                            }
                                        >
                                            Delete
                                        </button>

                                        <button
                                            className="update-action"
                                            onClick={() =>
                                                startEdit(
                                                    task
                                                )
                                            }
                                        >
                                            Update
                                        </button>

                                    </div>

                                </>

                            )}

                        </div>

                    ))

                )}

            </div>

        </section>
    );
}

export default Tasks;