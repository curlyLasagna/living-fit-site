import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const getUserInfo = async () => {
    const token = Cookies.get('living_fit_token');
    if (!token) {
        console.error('No token found');
        return;
    }
    const memberId = jwtDecode(token).userId;

    const userRes = await fetch(`http://localhost:3000/api/user/${memberId}`, { credentials: 'include' });

    if (!userRes.ok) {
        console.error('Failed to fetch user data');
    }

    const user = await userRes.json();
    return { memberId: user.memberId, locationId: user.locationId }
}