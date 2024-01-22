import { getServerSession } from "next-auth";
import Form from "./form"


export default async function AddTopicPage() {
    const session = await getServerSession();
    
    return (
        <Form />
    )
}
