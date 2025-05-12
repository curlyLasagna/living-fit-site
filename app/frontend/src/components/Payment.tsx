import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import UserPricingSection from './UserPricingSection';

interface User {
    fname: string;
    lname: string;
    email: string;
    membershipStatus: string;
    locationId?: number;
}

interface Payment {
    cardHolderName: string;
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    billingAddress: string;
}

interface Location {
    name: string;
}

interface UserProps {
    memberId: number;
}

const PaymentComponent: React.FC<UserProps> = ({ memberId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [payment, setPayment] = useState<Payment | null>(null);
    const [location, setLocation] = useState<Location | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const token = Cookies.get('living_fit_token');
            if (!token) {
                setError('You are not logged in.');
                return;
            }
            // Fetch user data
            const userRes = await fetch(`http://localhost:3000/api/user/${memberId}`, { credentials: 'include' });
            if (!userRes.ok) {
                setError('Could not fetch user data.');
                return;
            }
            const userData = await userRes.json();
            setUser(userData);
            // Fetch payment data
            const paymentRes = await fetch(`http://localhost:3000/api/payments/member/${memberId}`, { credentials: 'include' });
            setPayment(paymentRes.ok ? await paymentRes.json() : null);
            // Fetch location data
            if (userData.locationId) {
                const locRes = await fetch(`http://localhost:3000/api/locations/${userData.locationId}`);
                setLocation(locRes.ok ? await locRes.json() : null);
            }
        };
        fetchData();
    }, [memberId]);

    return (
        <div className="card bg-base-100 shadow-xl max-w-md mx-auto my-8">
            <div className="card-body">
                <h2 className="card-title justify-center">Payment & Fees</h2>
                {error ? (
                    <div className="alert alert-error mt-2">{error}</div>
                ) : user ? (
                    <>
                        <h3 className="font-bold text-lg mb-2">Fees</h3>
                        <div className="mb-2"><span className="font-bold">Location:</span> {location ? location.name : 'Unknown'}</div>
                        <div className="mb-2"><span className="font-bold">Membership Status:</span> {user.membershipStatus}</div>
                        <UserPricingSection locationId={user.locationId} />
                        <h3 className="font-bold text-lg mb-2">Payment Info</h3>
                        {payment ? (
                            <>
                                <div className="mb-1"><span className="font-bold">Card Holder:</span> {payment.cardHolderName}</div>
                                <div className="mb-1"><span className="font-bold">Card Number:</span> {payment.cardNumber}</div>
                                <div className="mb-1"><span className="font-bold">Expires:</span> {payment.expirationMonth}/{payment.expirationYear}</div>
                                <div className="mb-1"><span className="font-bold">Billing Address:</span> {payment.billingAddress}</div>
                            </>
                        ) : (
                            <div className="text-warning">No payment info found.</div>
                        )}
                    </>
                ) : (
                    <div className="loading loading-spinner loading-lg mx-auto"></div>
                )}
            </div>
        </div>
    );
};

export default PaymentComponent;
