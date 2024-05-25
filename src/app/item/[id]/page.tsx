export default function Item({ params }: { params: { id: string } }) {
	return <div>{params.id}</div>;
}
