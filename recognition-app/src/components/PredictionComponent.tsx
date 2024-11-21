import { FC } from "react";
import { Prediction } from "../types";


const PredictionComponent: FC<Prediction> = ({category, score}) => {
    return (
        <div className="prediction-box">
            <p className="">{category.toUpperCase()}</p>
            <p className="category-accuracy text-white">
                {(score * 100).toFixed(1)}% Accuracy
            </p>
        </div>
    )
}
export default PredictionComponent;