"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";



interface InputWithLabelProps {
  label: string;
  placeholder: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

export function InputWithLabel({ label, placeholder, setTitle }: InputWithLabelProps) {
  
  return (
    <div className="grid items-center gap-1.5 w-[80%] shadow-lg">
      <Label htmlFor="email">{label}</Label>
      <Input type="email" id="email" placeholder={placeholder} onChange={(e)=> setTitle(e.target.value)} />
    </div>
  )
}
