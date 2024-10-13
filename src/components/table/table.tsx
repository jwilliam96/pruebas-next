import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { payments } from "@/data/data-table"
import { Badge } from "@/components/ui/badge"

const fetchData = async () => {
    return payments
}

export async function TableDemo() {

    const data = await fetchData()
    const currency = (price: number) => {
        const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
        }).format(price)

        return formatted
    }

    return (
        <Table className="border max-w-[900px] mx-auto">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ClientName</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((invoice) => (
                    <TableRow key={invoice.id}>
                        <TableCell className="font-medium pr-32">{invoice.clientName}</TableCell>
                        <TableCell>{invoice.email}</TableCell>

                        <TableCell>
                            <Badge variant={
                                invoice.status === "pending"
                                    ? "secondary" :
                                    invoice.status === "failed" ?
                                        "destructive" :
                                        invoice.status === "processing" ?
                                            "info" :
                                            "success"
                            }>
                                {invoice.status}
                            </Badge></TableCell>


                        <TableCell className="text-right">{currency(invoice.amount)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}
