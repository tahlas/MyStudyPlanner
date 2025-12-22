import "/src/style.css";

function ItemCard({item, title, subtitle, description, rightContent, onClick, isSelected = false}){
    return (
        <div
            className={"itemCard pl-1 pr-1 pb-1 pt-1 mb-2 mr-5 text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl " + (isSelected ? "task-pop-in" : "")}
            style={{
                // TODO: Should change this when/if we implement click functionality for all cards 
                cursor: onClick ? "pointer" : "default",
                backgroundColor: item.color,
                filter: isSelected ? "brightness(110%)" : "none",
                border: isSelected ? "3px solid #f4a261" : "none",
                // padding: isSelected ? "5px" : "0px",
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