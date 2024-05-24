export default function Item ({ params }: Readonly<{ params: { itemId: string } }>) {
    return <div>{params.itemId}</div>;
}