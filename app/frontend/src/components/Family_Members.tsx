import { useState, useEffect } from 'react';
import { getUserInfo } from '../../util/getUserInfo';
import QRCode from 'react-qr-code';

export default function FamilyMembers() {
    const [name, setName] = useState('');
    const [memberId, setMemberId] = useState<number | null>(null);
    const [locationId, setLocationId] = useState<number | null>(null);
    const [familyFee, setFamilyFee] = useState<string>('');
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [familyMembers, setFamilyMembers] = useState<any[]>([]);

    useEffect(() => {
        (async () => {
            const user = await getUserInfo();
            console.log("user here:", user);
            if (user) {
                setMemberId(user.memberId);
                setLocationId(user.locationId);
                // Fetch fees for this location
                const res = await fetch(`http://localhost:3000/api/fees/location/${user.locationId}`);
                if (res.ok) {
                    const data = await res.json();
                    console.log("monthly fee:", data);
                    if (data.familyMemberFee) {
                        setFamilyFee(data.familyMemberFee);
                    } else if (data.baseMonthlyFee) {
                        setFamilyFee((parseFloat(data.baseMonthlyFee) * 0.4).toFixed(2));
                    }
                }
                // Fetch family members for this parent
                const famRes = await fetch(`http://localhost:3000/api/family-member/parent/${user.memberId}`);
                if (famRes.ok) {
                    setFamilyMembers(await famRes.json());
                }
            }
        })();
    }, []);

    const handleDelete = async (familyMemberId: number) => {
        setError(null);
        setSuccess(null);
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/family-member/${familyMemberId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed to remove family member');
            setSuccess('Family member removed!');
            // Remove from local state
            setFamilyMembers(familyMembers.filter(fm => fm.familyMemberId !== familyMemberId));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/family-member/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parentMemberId: memberId,
                    name: name.trim(),
                    locationId: locationId
                }),
                credentials: 'include'
            });
            if (!res.ok) throw new Error('Failed to add family member');
            setSuccess('Family member added!');
            setName('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/2">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">Add Family Member</h2>
                        {familyFee && (
                            <div className="alert alert-info mb-4">
                                Adding a family member will add <b>${familyFee}</b> to your monthly bill.
                            </div>
                        )}
                        <form onSubmit={handleSubmit} action="POST">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Family Member Name</span>
                                </label>
                                <input
                                    type="text"
                                    className="input input-bordered"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    placeholder="Enter name"
                                    required
                                />
                            </div>
                            <button className="btn btn-primary mt-4 w-full" type="submit" disabled={loading}>
                                {loading ? 'Adding...' : 'Add Family Member'}
                            </button>
                        </form>
                        {success && <div className="alert alert-success mt-2">{success}</div>}
                        {error && <div className="alert alert-error mt-2">{error}</div>}
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2">
                <div className="card bg-base-100 shadow">
                    <div className="card-body">
                        <h2 className="card-title">Your Family Members</h2>
                        {familyMembers.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {familyMembers.map((fm) => (
                                            <tr key={fm.familyMemberId}>
                                                <td>{fm.name}</td>
                                                <td className="flex gap-2">
                                                    <button className="btn btn-ghost btn-xs" title="View" disabled={loading}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                                    </button>
                                                    <button className="btn btn-ghost btn-xs text-error" title="Remove" onClick={() => handleDelete(fm.familyMemberId)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-4 text-base-content/70">
                                <p>No family members added yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}