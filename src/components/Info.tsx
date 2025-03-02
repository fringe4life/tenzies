

export default function Info({children}: React.ComponentPropsWithoutRef<"div">){
    return (
        <div className="flex justify-between my-4">
            {children}
        </div>
    )

}