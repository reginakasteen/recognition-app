import { FC } from "react";

const ImageComponent: FC<{imageURL: string}> = ({imageURL}) => {
    return (
        <div className="image-container m-3">
            <img src={imageURL} className="image w-50"/>
        </div>);
}

export default ImageComponent;