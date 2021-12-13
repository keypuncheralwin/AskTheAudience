import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--text)"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--accent)"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "var(--accent)"
      },
      "& .MuiOutlinedInput-input": {
        color: "var(--text)"
      },
      "&:hover .MuiOutlinedInput-input": {
        color: "var(--text)"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: "var(--text)"
      },
      "& .MuiInputLabel-outlined": {
        color: "var(--text)"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "var(--text)"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "var(--text)"
      },
    }
  });

  export default useStyles