import { Button } from "@/components/ui/button";
import React from "react";
interface Props {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const DataPagination = ({ page, totalPages, onPageChange }: Props) => {
    return (
        <div className=" flex justify-between items-center">
            <div className=" flex-1 text-sm text-muted-foreground">
                Page {page} for {totalPages || 1}
            </div>
            <div className=" flex items-center justify-end  space-x-2 py-4">
                <Button
                    disabled={page === 1}
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => onPageChange(page - 1)}
                >
                    Previous
                </Button>
                <Button
                    disabled={page === totalPages || totalPages === 1 || totalPages === 0}
                    variant={"outline"}
                    size={"sm"}
                    onClick={() => onPageChange(page + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default DataPagination;