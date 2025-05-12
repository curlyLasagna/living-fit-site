import React, { useState } from "react";

type CancelMembershipButtonProps = {
    memberId: number;
};

const CancelMembershipButton: React.FC<CancelMembershipButtonProps> = ({ memberId }) => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleCancel = async () => {
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            // 1. Update user status
            const userRes = await fetch(`http://localhost:3000/api/user/${memberId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ membershipStatus: "cancelled" }),
                credentials: "include",
            });
            if (!userRes.ok) throw new Error("Failed to cancel membership");

            // 2. Get QR code by memberId
            const qrRes = await fetch(`http://localhost:3000/api/qr/member/${memberId}`, {
                credentials: "include",
            });
            if (!qrRes.ok) throw new Error("Failed to fetch QR code");
            const qrCodes = await qrRes.json();
            if (!qrCodes || !qrCodes.length) throw new Error("No QR code found for user");
            const qrCodeId = qrCodes[0].qrCodeId;

            // 3. Expire QR code
            const expireRes = await fetch(`http://localhost:3000/api/qr/${qrCodeId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "expired" }),
                credentials: "include",
            });
            if (!expireRes.ok) throw new Error("Failed to expire QR code");

            setSuccess("Membership cancelled and QR code expired.");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button className="btn btn-error" onClick={handleCancel} disabled={loading}>
                {loading ? "Cancelling..." : "Cancel Membership"}
            </button>
            {success && <div className="alert alert-success mt-2">{success}</div>}
            {error && <div className="alert alert-error mt-2">{error}</div>}
        </div>
    );
};

export default CancelMembershipButton;
