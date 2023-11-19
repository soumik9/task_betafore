import { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component'
import { atomToken } from '../../hooks/atomState';
import { useAtom } from 'jotai';
import { axiosGET } from '../../hooks/axiosMethods';

const MyOrders = () => {

    // states
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token] = useAtom(atomToken);

    // fetching data
    useEffect(() => {
        const fetchData = async () => {
            const dataGET = await axiosGET('order/auth-by-id', setLoading, token);
            setOrders(dataGET);
        };
        fetchData();
    }, [token])

    // datas
    const columns = [
        {
            name: 'Name',
            selector: (row) => row.user.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: (row) => row.user.email,
            sortable: true,
        },
        {
            name: 'Total Products',
            selector: (row) => row.products.length,
            sortable: true,
        },
        {
            name: 'Total Cost',
            selector: (row) => `${row.total} BDT`,
            sortable: true,
        },
        {
            name: 'Status',
            selector: (row) => row.status,
            sortable: true,
        },

    ];

    return (
        <div className="mt-16 container">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden py-6">

                <h2 className="text-center text-[26px] border-b font-medium pb-2">My Orders</h2>

                <div className="mt-4 px-2">

                    <DataTable
                        columns={columns}
                        data={orders}
                        highlightOnHover
                        progressPending={loading}
                        pagination
                        persistTableHead={true}
                        paginationPerPage={15}
                    />

                </div>

            </div>
        </div>

    )
}

export default MyOrders