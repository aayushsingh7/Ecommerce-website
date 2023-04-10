import React from 'react'

const Offers = () => {
    return (
        <div className="Product-offers">
            <p style={{ fontWeight: "600", width: "100%", padding: "5px" }}>Offers</p>
            <ul className="Offers-here">
                <li className="Offer-boxes">
                    <div style={{ width: "140px" }}>
                        <p style={{ marginBottom: "8px", fontWeight: "600" }}>{"No cost emi"}</p>
                        <p style={{ fontSize: "14px", marginBottom: "6px" }}>loremdjfk dklfjaldk kldfja kladjf</p>
                        <p style={{ fontSize: "15px", color: "#00798c" }}>{`3 offer >`}</p>
                    </div>
                </li>

                <li className="Offer-boxes">
                    <div style={{ width: "140px" }}>
                        <p style={{ marginBottom: "8px", fontWeight: "600" }}>{"No cost emi"}</p>
                        <p style={{ fontSize: "14px", marginBottom: "6px" }}>loremdjfk dklfjaldk kldfja kladjf</p>
                        <p style={{ fontSize: "15px", color: "#00798c" }}>{`3 offer >`}</p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Offers