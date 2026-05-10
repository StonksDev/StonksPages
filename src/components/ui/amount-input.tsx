'use client';

import React, { forwardRef } from 'react';
import { Input } from './input';
import { Label } from './label';
import { cn } from '@/lib/cn';

export interface AmountInputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'> {
    label?: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    max?: number;
    decimals?: number;
    suffix?: string;
}

const AmountInput = forwardRef<HTMLInputElement, AmountInputProps>(
    ({ className, label, value, onChange, error, max, decimals = 6, suffix, ...props }, ref) => {
        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value;

            // Allow empty string
            if (inputValue === '') {
                onChange('');
                return;
            }

            // Only allow numeric characters and decimal point
            const numericRegex = /^[0-9]*\.?[0-9]*$/;
            if (!numericRegex.test(inputValue)) {
                return;
            }

            // Prevent multiple decimal points
            if ((inputValue.match(/\./g) || []).length > 1) {
                return;
            }

            // Limit decimal places
            const decimalIndex = inputValue.indexOf('.');
            if (decimalIndex !== -1 && inputValue.length - decimalIndex - 1 > decimals) {
                return;
            }

            // Check maximum value if provided
            const numValue = parseFloat(inputValue);
            if (max && numValue > max) {
                return;
            }

            onChange(inputValue);
        };

        const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const paste = e.clipboardData.getData('text');
            const numericRegex = /^[0-9]*\.?[0-9]*$/;

            if (numericRegex.test(paste)) {
                const numValue = parseFloat(paste);
                if (!max || numValue <= max) {
                    onChange(paste);
                }
            }
        };

        return (
            <div className="space-y-2 min-w-0">
                {label && (
                    <Label htmlFor={props.id} className={error ? 'text-destructive' : ''}>
                        {label}
                    </Label>
                )}
                <div className="relative min-w-0">
                    <Input
                        ref={ref}
                        type="text"
                        inputMode="decimal"
                        value={value}
                        onChange={handleInputChange}
                        onPaste={handlePaste}
                        className={cn(
                            error && 'border-destructive focus-visible:ring-destructive',
                            suffix && 'pr-12',
                            className
                        )}
                        {...props}
                    />
                    {suffix && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                            {suffix}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}
            </div>
        );
    }
);

AmountInput.displayName = 'AmountInput';

export { AmountInput };

