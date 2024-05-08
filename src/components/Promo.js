function Promo(props) {

    const styles = {
        color: "tomato",
        fontSize: "40px"
    }
    
    return (
            <div className="promo-section">
                <div>
                    <h1 style={styles}>
                        {props.heading}
                    </h1>
                </div>
                <div>
                    <h2>{props.promoSubHeading}</h2>
                </div>
            </div>
        );
    }

    // /
    // Using this approach makes your components more self-contained, because they come with their own styles built-in, but it also makes them a bit harder to maintain.