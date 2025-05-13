import { useEffect, useState } from "react";

interface Fee {
    joiningFee: string;
    baseMonthlyFee: string;
    annualFee: string;
}

interface Location {
    locationId: number;
}


const UserPricingSection: React.FC<{ locationId?: number }> = ({ locationId }) => {
    const [price, setPrice] = useState<Fee>({
        joiningFee: "0",
        baseMonthlyFee: "0",
        annualFee: "0",
    });

    useEffect(() => {
        if (!locationId) return;
        (async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/fees/location/${locationId}`
                );
                const data = await response.json();
                setPrice({
                    joiningFee: data.joiningFee,
                    baseMonthlyFee: data.baseMonthlyFee,
                    annualFee: data.annualFee,
                });
            } catch (error) {
                console.error("Failed to fetch pricing data:", error);
            }
        })();
    }, [locationId]);

    return (
        <div className="mb-4">
            <div className="flex flex-col">
                <h3 className="font-bold text-lg">Membership Pricing</h3>
                <div className="mt-2 flex flex-row">
                    <p>
                        <span className="font-semibold">Monthly Fee:</span> ${price.baseMonthlyFee}
                    </p>
                    <p>
                        <span className="font-semibold">Annual Fee:</span> ${price.annualFee}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserPricingSection;
