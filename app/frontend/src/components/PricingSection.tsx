import { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { selected_location } from "@/store";

const PricingSection: React.FC = () => {
    const selectedLocation = useStore(selected_location);
    const [price, setPrice] = useState({
        joiningFee: "0",
        monthlyFee: "0",
        annualFee: "0",
    });

    useEffect(() => {
        // Fetch pricing data when selectedLocation changes
        (async () => {
            try {
                const response = await fetch(
                    `http://localhost:3000/api/fees/location/${selectedLocation.locationId}`
                );
                const data = await response.json();
                setPrice({
                    joiningFee: data.joiningFee,
                    monthlyFee: data.baseMonthlyFee,
                    annualFee: data.annualFee,
                });
            } catch (error) {
                console.error("Failed to fetch pricing data:", error);
            }
        })();
    }, [selectedLocation]);

    return (
        <div className="alert alert-info shadow-lg mb-4 bg-off-white">
            <div className="flex flex-col">
                <h3 className="font-bold text-lg text-primary">Membership Pricing</h3>
                <div className="mt-2">
                    <p>
                        <span className="font-semibold">Joining Fee:</span> ${price.joiningFee} (due today)
                    </p>
                    <p>
                        <span className="font-semibold">Monthly Fee:</span> ${price.monthlyFee} (starts next month)
                    </p>
                    <p>
                        <span className="font-semibold">Annual Fee:</span> ${price.annualFee} (due next year)
                    </p>
                </div>
                <p className="text-sm mt-2">
                    The joining fee is non-refundable and will be charged immediately upon signup.
                </p>
            </div>
        </div>
    );
};

export default PricingSection;