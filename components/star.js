import React, { useState, useEffect } from 'react';
export default function StarRating({ name = 'rate', value, readonly = false }) {
    const [rating, setRating] = useState(value);
    const [stars, setStars] = useState([]);
    useEffect(() => {
        let stars = [];
        for (let i = 0; i < 10; i++) {
            let klass = "ion-ios-star-outline";
            if (rating >= i && rating !== null) {
                klass = "ion-ios-star";
            }
            stars.push(
                readonly ? <i key={i}
                    style={{ display: "inline-block", width: "7px", overflow: "hidden", direction: (i % 2 === 0) ? "ltr" : "rtl" }}
                    className={klass}
                /> : <i key={i}
                    style={{ display: "inline-block", width: "7px", overflow: "hidden", direction: (i % 2 === 0) ? "ltr" : "rtl" }}
                    className={klass}
                    onMouseOver={() => handleMouseover(i)}
                    onClick={() => rate(i)}
                    onMouseOut={() => handleMouseout()}
                />
            );
        }
        setStars(stars);
    }, [value]);

    function handleMouseover(rating) {
        // this.setState(prev => ({
        //     rating,
        //     temp_rating: prev.rating
        // }));
    }

    function handleMouseout() {
        // this.state.rating = this.state.temp_rating;
        // this.setState({ rating: this.state.rating });
        // this.setState(prev => ({
        //     rating: prev.temp_rating
        // }));
    }

    function rate(rating) {
        // this.setState({
        //     rating,
        //     temp_rating: rating
        // });
    }
    return (
        <div className="rating">
            {stars}
        </div>
    );
};
