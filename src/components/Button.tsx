
export default function Button({onClick, children, className, disabled}: React.ComponentPropsWithoutRef<"button">){
    return (
        <button disabled={disabled} onClick={onClick} type="button" className={ `cursor-pointer px-4 py-2 rounded-md  ${className}`}>{children}</button>
    )
}