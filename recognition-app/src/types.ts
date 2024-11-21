export type Prediction = {
    category: string
    score: number
}

export type UseImageUploadResult = {
    uploadImage: (file: File) => Promise<void> 
    prediction: Prediction[] | null
    isLoading: boolean
    error: string | null
}