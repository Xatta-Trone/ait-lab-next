import Navbar from "@/components/Navbar";

const Provider = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Provider