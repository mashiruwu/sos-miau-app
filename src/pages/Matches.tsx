import { useEffect, useState } from "react";
import TableMatches from "../components/TableMatches/TableMatches";

const Matches = () => {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        const requestTableData = async () => {
            try {
                const API = import.meta.env.VITE_API_URL

                let id = sessionStorage.getItem("ongId");
                if (!id) {
                    return
                }
                console.log(API + "/match/checkMatchesScreen/" + id)
                const response = await fetch(API + "/match/checkMatchesScreen/" + id, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    console.error("Failed to find Matches");
                    return;
                }
                const data = await response.json();
                
                console.log(data)
                setTableData(data)

            } catch (error) {
                console.error("Error getting match data:", error);
            }
        }
        requestTableData();
    }, [])

    return <TableMatches data={tableData} />
}

export default Matches;