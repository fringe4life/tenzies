
export default function RollInfo({ children, className}: React.ComponentPropsWithoutRef<"p">){
    return  <p className={`${className}` }aria-live="off">{children}</p>
}