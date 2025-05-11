import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

const QRCodeComponent = () => {
    const [uuid, setUuid] = useState<string | null>(null);

    useEffect(() => {
        const token = Cookies.get('living_fit_token');

        if (!token) {
            console.log('No token found');
            return;
        }

        const { userId } = jwtDecode(token);

        fetch(`http://localhost:3000/api/qr/member/${userId}`, {
            method: 'GET',
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch QR code data');
                }
                return response.json();
            })
            .then((data) => {
                setUuid(data.uuid);
            })
            .catch((error) => {
                console.error('Error fetching QR code data:', error);
            });
    }, []);

    return (
        <div className="qr-code-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            {uuid ? (
                <>
                    <QRCode
                        value={uuid}
                        size={256}
                        bgColor="#ffffff"
                        fgColor="#000000"
                    />
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Scan this at the door</p>
                        <p style={{ color: '#d97706', fontSize: '1rem', marginTop: '0.5rem' }}>
                            You will be charged $10 if you bring a guest with you.
                        </p>
                    </div>
                </>
            ) : (
                <p>Loading QR code...</p>
            )}
        </div>
    );
};

export default QRCodeComponent;