'use client'

interface InputProps {
    type:any;
    value:any;
    onChange?:(event: React.ChangeEvent<HTMLInputElement>)=> void;
    name:string;
    id:string;
    placeholder:string;
    big?:boolean;
}

const Input = ({type, value, onChange, name, id, placeholder, big }:InputProps) => {
  return (
    <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        name={name} 
        id={id} 
        className={`w-full p-3 font-light bg-white border-2 outline-none text-black ${ big ? 'w-[400px]px pb-[6rem]' : '' } `}
    />
  )
}

export default Input