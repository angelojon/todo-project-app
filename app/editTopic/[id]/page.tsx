import EditTopicForm from "@/components/editTopicForm";

export default function EditTopic() {
    return <div> {<EditTopicForm task={{
        todoid: 0,
        task: "",
        description: ""
    }} onCancel={function (): void {
        throw new Error("Function not implemented.");
    } } onUpdate={function (updatedTask: { title: string; description: string; }): void {
        throw new Error("Function not implemented.");
    } } />}</div>
}
