import Navigation from "./Navigation";

export default function LayoutComponent({children}:any){

return (
<>
    <Navigation />

    <main className="responsive">
        <div className="max">
            {children}
        </div>
    </main>

</>
)

}
