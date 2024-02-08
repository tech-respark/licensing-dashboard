import RequestDetailsPage from "@/components/templates/requestDetailsPage";

function page({ params }: any) {
    console.log("props", params.requestId);

    return (
        <RequestDetailsPage requestId={params.requestId} />
    )
}

export default page