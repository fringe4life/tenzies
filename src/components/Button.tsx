
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {

}

export default function Button({onClick, children, className, disabled}: ButtonProps){
    return (
        <button disabled={disabled} onClick={onClick} type="button" className={ `px-4 py-2 rounded-md  ${className}`}>{children}</button>
    )
}