import acCleaning from "../../assets/services/ac-cleaning.png";
import gasRefill from "../../assets/services/gas-refill.png";
import jetCleaning from "../../assets/services/jet-cleaning.png";

export const services = [
    {
        id: 1,
        name: "Panel Foam Cleaning",
        price: 699,
        image: acCleaning
    },
    {
        id: 2,
        name: "Panel Jet Cleaning",
        price: 999,
        image: jetCleaning
    },
    {
        id: 3,
        name: "Panel Maintenance",
        price: 2499,
        image: gasRefill
    }
];

export const orders = [
    {
        id: "ORD001",
        service: "Panel Foam Cleaning",
        status: "Assigned",
        technician: "Rahul Kumar",
        date: "12 March",
        slot: "11:00 AM - 1:00 PM"
    }
];

export const jobs = [
    {
        id: "JOB101",
        customer: "Amit Sharma",
        service: "Panel Foam Cleaning",
        address: "Raj Nagar, Ghaziabad",
        payout: 550
    },
    {
        id: "JOB102",
        customer: "Neha Verma",
        service: "Panel Jet Cleaning",
        address: "Vaishali, Ghaziabad",
        payout: 700
    }
];
