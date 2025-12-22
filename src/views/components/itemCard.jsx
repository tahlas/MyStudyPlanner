import "/src/style.css";

function ItemCard({item, title, subtitle, description, rightContent, onClick}){
    return (
        <div
            key={item.id}
            className="overviewTask pl-1 pr-1 pb-1 pt-1 mb-2"
            style={{
                backgroundColor: item.color,
                // not sure if cursor code is correct
                cursor: onClick ? "pointer" : "default",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
            }}
            onClick={onClick}
        >
            <div>
                <span className="font-bold">{title}</span>
                <br />
                <span className="font-medium">{subtitle}</span>
                <br />
                {description && <span>{description}</span>}
            </div>
            <div className="pr-1">{rightContent}</div>
        </div>
    );
}

export default ItemCard;