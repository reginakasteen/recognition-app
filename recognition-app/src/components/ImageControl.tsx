import { ChangeEvent, useState } from "react";
import { useImageUpload } from "../hooks/useImageUpload";
import { api_key } from "../keys/api_keys";
import ImageComponent from "./ImageComponent";
import PredictionComponent from "./PredictionComponent";

const ImageControl = () => {
    const [image, setImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // const prediction: any[] = [];
    // const isLoading: boolean = false;
    // const error: string | null = null;

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setImage(URL.createObjectURL(file));
        }
    }

    const handleUploadImage = async () => {
        if (selectedFile) {
            await uploadImage(selectedFile);
        } else {
            console.error('No file is selected');
        }
    }

    const { uploadImage, prediction, isLoading, error} = useImageUpload(`${api_key}/predict`);

    return (
    <section className="container w-100 rounded bg-secondary py-5 px-3">
        <div className="my-3 ">
            {!image && <h2 className="mx-3 mb-4">Please upload your image</h2>}

            {image && (
                <ImageComponent imageURL={image} />
            )}

            {prediction && prediction[0] && (
                <PredictionComponent category={prediction[0].category} score={prediction[0].score} />
            )}

            {error && <p className="text-danger">{error}</p>}

            <input type="file" className="form-control-file" onChange={handleImageChange} accept="image/*" />
            <button onClick={handleUploadImage} className="btn btn-warning" disabled={!selectedFile || isLoading}>
                {isLoading ? "Uploading..." : image ? "Submit" : "Upload"}
            </button>
        </div>
    </section>)
    
}
export default ImageControl;