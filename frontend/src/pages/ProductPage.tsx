import { useParams } from "react-router-dom";

function ProductPage() {
    let { id } = useParams();
    
    const i = 1;
    return (
        <>
            <h1>Hello world</h1>
            <p>abc</p>
            <h1>{i+i} = 3</h1>

            
            {i?
                <>
                <h1>True</h1>
                {id}
                </>
            :
                <h2>false</h2>
            }

        </>
    );
}

export default ProductPage;