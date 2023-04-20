import { FC, useState } from "react";

interface IPagination {
    onChangePage: () => void;
    skip: number;
    take: number;
}

const Pagination : FC<IPagination> = ({onChangePage, skip: skipProp, take: numberProp}) => {
    const [skip, setSkip] = useState<number>(skipProp);

    return <div>
        {
           
        }
    </div>
}

export default Pagination;