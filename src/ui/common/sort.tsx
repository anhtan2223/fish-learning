'use client'
import {Select} from 'antd'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function SortComponent(
    {options} :
    {options? : {value:string , label:string}[] }

) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const onChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('sort', value);
        replace(`${pathname}?${params.toString()}`);
    }
    return (
        <div>
            <Select
                className = 'w-full'
                defaultValue={searchParams.get('sort') || 'default'}
                onChange={onChange}
                options={options}
            />
        </div>
    );
}