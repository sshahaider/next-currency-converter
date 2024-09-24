"use client";
import { usePathname, useRouter } from 'next/navigation';
import React, { FC, useState } from 'react';
import { currencies } from '@/lib/constent';
import Flag from './Flag';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Spinner from './Spinner';
import MagicBox from './ui/magicBox';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ArrowLeftRight, Banknote, CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';

interface Props {
    from: string;
    to: string;
    amount: number;
}

export type Key = 'from' | 'to';

const Converter: FC<Props> = ({ from, to, amount }) => {
    const [openStates, setOpenStates] = useState<Record<Key, boolean>>({
        from: false,
        to: false,
    });

    const [newAmount, setNewAmount] = useState<string>(amount.toString());
    const [loading, setLoading] = useState<boolean>(false);
    const [values, setValues] = useState<Record<Key, string>>({ from, to });

    const router = useRouter();
    const pathname = usePathname();

    const handleOpenChange = (key: Key, isOpen: boolean) => {
        setOpenStates((prev) => ({ ...prev, [key]: isOpen }));
    };

    const handleSelect = (key: Key, value: string) => {
        setValues((prev) => ({ ...prev, [key]: value }));
    };

    const handlePush = () => {
        const fromValue = values['from'];
        const toValue = values['to'];
        if (!fromValue || !toValue || fromValue.toLowerCase() === toValue.toLowerCase() || !newAmount || newAmount === "0") return;
        if (pathname === `/${fromValue.toLowerCase()}/${toValue.toLowerCase()}/convert/${newAmount}`) return;

        setLoading(true);
        router.push(`/${fromValue.toLowerCase()}/${toValue.toLowerCase()}/convert/${newAmount}`);
    };

    return (
        <>
            <div className='w-full'>
                <Label htmlFor="amount">Amount</Label>
                <Input
                    icon={<Banknote className='size-5' />}
                    id="amount"
                    disabled={loading}
                    min={1}
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    placeholder="1"
                />
            </div>
            <div className="w-full flex items-center justify-center gap-2 my-2">
                <div className="w-full">
                    <Label className='font-bold capitalize' htmlFor="from">From</Label>
                    <MagicBox
                        open={openStates['from']}
                        onOpenChange={(isOpen) => handleOpenChange('from', isOpen)}
                        trigger={
                            <Button
                                id="from"
                                variant="outline"
                                role="combobox"
                                size="sm"
                                className={cn(
                                    "w-full justify-between capitalize rounded-full py-1",
                                    values['from'] && "bg-primary hover:bg-primary text-white hover:text-white"
                                )}
                            >
                                {values['from'] ? <Flag c={values['from']} /> : 'From'}
                                <CaretSortIcon className="ml-1 h-4 w-4 shrink-0 opacity-70" />
                            </Button>
                        }
                    >
                        <Command>
                            <CommandInput placeholder="Filter ..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup className="min-h-[150px]">
                                    {currencies.map(({ c }) => (
                                        <CommandItem
                                            key={c}
                                            value={c}
                                            onSelect={() => handleSelect('from', c)}
                                        >
                                            <Flag c={c} />
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    c === values['from'] ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </MagicBox>
                </div>
                <ArrowLeftRight className="size-16 -mb-5" />
                <div className="w-full">
                    <Label className='font-bold capitalize' htmlFor="to">To</Label>
                    <MagicBox
                        open={openStates['to']}
                        onOpenChange={(isOpen) => handleOpenChange('to', isOpen)}
                        trigger={
                            <Button
                                id="to"
                                variant="outline"
                                role="combobox"
                                size="sm"
                                className={cn(
                                    "w-full justify-between capitalize rounded-full py-1",
                                    values['to'] && "bg-primary hover:bg-primary text-white hover:text-white"
                                )}
                            >
                                {values['to'] ? <Flag c={values['to']} /> : 'To'}
                                <CaretSortIcon className="ml-1 h-4 w-4 shrink-0 opacity-70" />
                            </Button>
                        }
                    >
                        <Command>
                            <CommandInput placeholder="Filter ..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup className="min-h-[150px]">
                                    {currencies.map(({ c }) => (
                                        <CommandItem
                                            key={c}
                                            value={c}
                                            onSelect={() => handleSelect('to', c)}
                                        >
                                            <Flag c={c} />
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    c === values['to'] ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </MagicBox>
                </div>
            </div>
            <Button
                icon={<Spinner active={loading} />}
                onClick={handlePush}
                className="w-full rounded-full font-bold"
            >
                Convert
            </Button>
        </>
    );
};

export default Converter;
