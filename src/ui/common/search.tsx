'use client'
import { Input, GetProps } from "antd";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type SearchProps = GetProps<typeof Input.Search>;
const { Search } = Input;

export default function MySearch(
    {
        placeholder,
        className,
    }:
        {
            placeholder?: string
            className?: string
        }
) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();


    const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
        const params = new URLSearchParams(searchParams);
        params.delete('page');

        if (value) {
            params.set('query', value);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };
    return (
        <Search
            placeholder={placeholder}
            allowClear
            onSearch={onSearch}
            className={className}
            defaultValue={searchParams.get('query') || ''}
        />
    );
}