import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


interface props {
    label:string
}
export default function SubmitButton(passedData:props) {
    const { pending } = useFormStatus();
    const {label} = passedData
    return (
      <Button variant="contained"  type = "submit" className="mt-4 w-full bg-black hover:bg-black" aria-disabled={pending}>
        {`${label}`} { pending ?(<CircularProgress    className="ml-auto h-5 w-5" size={15} color="success"/>):(<CheckCircleOutlineIcon className="ml-auto h-5 w-5 " />)} 
      </Button>
    );
}