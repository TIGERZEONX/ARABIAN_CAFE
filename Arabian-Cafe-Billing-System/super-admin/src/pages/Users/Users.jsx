import { useState, useEffect } from "react";
import { getUsers, getRoles, createUser, deleteUser } from "../../services/userService";
import styles from "./Users.module.css";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form states
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("");

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const loadData = async () => {
        try {
            setLoading(true);
            const [usersRes, rolesRes] = await Promise.all([getUsers(), getRoles()]);
            setUsers(usersRes.data.data);
            setRoles(rolesRes.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch user list.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleAddUser = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            await createUser({
                fullName,
                email,
                phone,
                password,
                role: selectedRole,
            });

            setMessage("User created successfully! 🎉");
            setFullName("");
            setEmail("");
            setPhone("");
            setPassword("");
            setSelectedRole("");
            loadData();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create user.");
        }
    };

    const handleDeleteUser = async (id) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await deleteUser(id);
            setMessage("User deleted successfully.");
            loadData();
        } catch (err) {
            setError("Failed to delete user.");
        }
    };

    if (loading) return <div style={{ padding: "40px", fontFamily: "Poppins" }}>Loading users list...</div>;

    return (
        <div style={{ padding: "40px", fontFamily: "Poppins" }}>
            <div style={{ marginBottom: "35px" }}>
                <h1 style={{ fontSize: "30px", fontWeight: "800", color: "var(--text)" }}>User Management</h1>
                <p style={{ color: "var(--text-light)" }}>Manage administrative and cashier personnel accounts.</p>
            </div>

            {message && <div style={{ padding: "12px", background: "#DCFCE7", color: "#166534", borderRadius: "8px", marginBottom: "20px" }}>{message}</div>}
            {error && <div style={{ padding: "12px", background: "#FEE2E2", color: "#991B1B", borderRadius: "8px", marginBottom: "20px" }}>{error}</div>}

            <div className={styles.grid}>

                {/* Users Table */}
                <div className={styles.card}>
                    <h3 style={{ marginBottom: "15px", color: "var(--primary-dark)" }}>System Users</h3>
                    <div className={styles.tableContainer}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id}>
                                        <td><strong>{u.fullName}</strong></td>
                                        <td>{u.email}</td>
                                        <td>{u.phone || "—"}</td>
                                        <td>
                                            <span style={{ background: "var(--primary-light)", color: "var(--primary-dark)", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600" }}>
                                                {u.role?.name || "No Role"}
                                            </span>
                                        </td>
                                        <td>
                                            <button onClick={() => handleDeleteUser(u._id)} className={styles.btnDanger}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add User Form */}
                <div className={styles.card}>
                    <h3 style={{ marginBottom: "20px", color: "var(--primary-dark)" }}>Add Personnel</h3>
                    <form onSubmit={handleAddUser}>

                        <div className={styles.formField}>
                            <label>Full Name</label>
                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                        </div>

                        <div className={styles.formField}>
                            <label>Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className={styles.formField}>
                            <label>Phone Number</label>
                            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>

                        <div className={styles.formField}>
                            <label>Role</label>
                            <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)} required>
                                <option value="">Select Role</option>
                                {roles.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
                            </select>
                        </div>

                        <div className={styles.formField}>
                            <label>Login Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>

                        <button type="submit" className={styles.btn} style={{ width: "100%" }}>Create User</button>
                    </form>
                </div>

            </div>
        </div>
    );
}
