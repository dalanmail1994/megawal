import PaymentsAcc from "../acc/payments";


export default function PaymentPage ({userId}) {


    return (
        <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center justify-between">
                <h2 className="text-2xl font-bold">Payment Methods</h2>
            </div>
            <PaymentsAcc userId={userId} />
        </div>
    )
}
