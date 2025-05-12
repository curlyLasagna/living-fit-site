import React, { useEffect, useState } from "react";

type UserProps = {
    memberId: number;
};

const UserDetails: React.FC<UserProps> = ({ memberId }) => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:3000/api/user/${memberId}`)
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch user");
                return res.json();
            })
            .then((data) => {
                setUser(data);
                setError(null);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div>Loading user data...</div>;
    if (error) return <div className="alert alert-error">{error}</div>;
    if (!user) return <div>No user data found.</div>;

    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">User Details</h2>
                <table className="table">
                    <tbody>
                        {Object.entries(user).map(([key, value]) => (
                            <tr key={key}>
                                <td className="font-bold">{key}</td>
                                <td>{String(value)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetails;