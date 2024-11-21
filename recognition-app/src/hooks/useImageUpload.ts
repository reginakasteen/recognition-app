import {useState} from "react";
import axios from 'axios';
import { Prediction, UseImageUploadResult } from "../types";

export const useImageUpload = (uploadURL: string): UseImageUploadResult => {
    const [prediction, setPrediction] = useState<Prediction[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const uploadImage = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post<Prediction[]>(uploadURL, formData, {
                headers: {"Contect-Type": "multipart/form-data"},

            });
            console.log(response.data);
            if (Array.isArray(response.data) && response.data.length > 0) {
                setPrediction(response.data);
            } else {
                setError('Invalid Response Format')
            }
        } catch (err) {
            console.error('Error: ', err);
            if (axios.isAxiosError(err)){
                setError(`Failed to upload image: ${err.message}. Status: ${err.response?.status}. ${err.response?.data?.detail || ""}`);
            } else {
                setError('Failed to upload image. Please try again')
            }
        } finally {
            setIsLoading(false);
        }
    }
    return { uploadImage, prediction, isLoading, error};
}