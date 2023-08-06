import React, { useCallback } from "react"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { TbPhotoPlus } from 'react-icons/tb'

declare global {
    var cloudinary : any;
}

interface ImageUploadProps {
    onChange: (value:string) => void;
    value:string;
}


const ImageUpload =  ({ onChange,value }:ImageUploadProps) => {
  
  const handleUpload = useCallback((result:any)=> {
    onChange(result.info.secure_url)
  },[onChange])


  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset="utnbxfoc"
      options={{
        maxFiles:1
      }}
    >
      {({open}) => (
        <div onClick={() => open?.()} className="relative cursor-pointer hover:opacity-70 border-dashed border-2  flex flex-col justify-center items-center h-[500px]" >
          <TbPhotoPlus/>
          <div className="text-lg">Click to Upload</div>
          {value && (
            <div>
                <Image src={value} alt="upload image" width={450} height={350} style={{objectFit:'cover'}}/>
            </div>
          )}
        </div>
      )}
    </CldUploadWidget>
  )
}

export default ImageUpload