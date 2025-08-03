export type Props = {
    page: number;
    pages: number;
    onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: Props) => {
    const pageNumbers = [];
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center">
            <ul className="flex gap-1 rounded-lg shadow border border-blue-100 bg-gradient-to-r from-blue-50 via-cyan-50 to-emerald-50 px-2 py-1">
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => onPageChange(number)}
                            className={`px-4 py-2 rounded-md font-semibold transition
                                ${
                                    page === number
                                        ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white shadow"
                                        : "bg-white text-blue-700 hover:bg-blue-50 border border-blue-100"
                                }
                            `}
                            aria-current={page === number ? "page" : undefined}
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;